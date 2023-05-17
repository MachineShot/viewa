from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import pandas as pd
import json
from surprise import Reader, Dataset, KNNBasic
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

# A very simple Flask Hello World app for you to get started with...

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_world():
    return "Hello from Flask!"


# Load the MovieLens dataset
movies = pd.read_csv('/home/machineshot/mysite/data/movies.csv')
ratings = pd.read_csv('/home/machineshot/mysite/data/ratings.csv')
links = pd.read_csv('/home/machineshot/mysite/data/links.csv')

# Merge the movies and links dataframes based on the 'movieId' column
movies = pd.merge(movies, links, on='movieId', how='left')

# Create a Reader object and load the ratings dataset
reader = Reader(rating_scale=(0.5, 5))
data = Dataset.load_from_df(ratings[['userId', 'movieId', 'rating']], reader)

# Train the KNNBasic algorithm on the ratings data
sim_options = {'name': 'cosine', 'user_based': True}
algo_collab = KNNBasic(k=20, min_k=1, sim_options=sim_options)
trainset = data.build_full_trainset()
algo_collab.fit(trainset)

# Create a TF-IDF vectorizer
tfidf = TfidfVectorizer(stop_words='english')

# Replace NaN values in the 'genres' column with an empty string
movies['genres'] = movies['genres'].fillna('')

# Compute the TF-IDF matrix
tfidf_matrix = tfidf.fit_transform(movies['genres'])

# Compute the cosine similarity matrix
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

# Collaborative filtering recommendation function
def collaborative_filtering_recommendations(movie_list, top_n=10):
    # Create a list of movie IDs from the input titles
    movie_ids = [movies[movies['title'] == title]['movieId'].values[0] for title in movie_list]

    # Get the inner IDs of the input movies
    movie_inner_ids = [trainset.to_inner_iid(movie_id) for movie_id in movie_ids]

    # Get the top N recommended movies from collaborative filtering
    top_movie_inner_ids = []
    for movie_inner_id in movie_inner_ids:
        try:
            neighbors = algo_collab.get_neighbors(movie_inner_id, k=top_n)
            top_movie_inner_ids.extend(neighbors)
        except (IndexError, KeyError):
            # Handle the case where the movie_inner_id is out of bounds or not found
            pass

    # Remove duplicates and keep only the top N movies
    top_movie_inner_ids = list(set(top_movie_inner_ids))[:top_n]

    # Get the raw IDs of the top N recommended movies
    top_movie_ids = [trainset.to_raw_iid(movie_inner_id) for movie_inner_id in top_movie_inner_ids]

    # Get the titles of the top N recommended movies
    top_movie_titles = movies[movies['movieId'].isin(top_movie_ids)][['title', 'tmdbId']]

    return top_movie_titles

# Content-based recommendation function
def content_based_recommendations(movie_list, top_n=10):
    # Create a list of movie IDs from the input titles
    movie_ids = [movies[movies['title'] == title]['movieId'].values[0] for title in movie_list]

    # Get the indices of the input movies
    indices = [movies[movies['movieId'] == movie_id].index[0] for movie_id in movie_ids]

    # Compute the average cosine similarity for tags
    sim_scores = cosine_sim[indices].mean(axis=0)

    # Get the indices of the top N movies with the highest similarity scores
    top_indices = sim_scores.argsort()[::-1][:top_n]

    # Remove the input movies from the recommended list
    top_indices = [idx for idx in top_indices if idx not in indices]

    # Get the titles of the top N recommended movies
    top_movie_titles = movies.iloc[top_indices][['title', 'tmdbId']]

    return top_movie_titles


@app.route("/content", methods=["POST"])
def content_based():
    title_list = request.get_json(force=True).get("titles")
    recommendations = content_based_recommendations(title_list)
    #return jsonify({"recommendations": recommendations.to_json(orient="records")})
    return Response(
        recommendations.to_json(orient="records"),
        mimetype="application/json"
    )


@app.route("/collaborative", methods=["POST"])
def collaborative_filtering():
    title_list = request.get_json(force=True).get("titles")
    recommendations = collaborative_filtering_recommendations(title_list)
    #return jsonify({"recommendations": recommendations.to_json(orient="records")})
    return Response(
        recommendations.to_json(orient="records"),
        mimetype="application/json"
    )


@app.route("/search=<string:search_query>")
def search(search_query):
    titles = movies[movies["title"].str.contains(search_query, case=False)]
    return Response(
        titles[["tmdbId", "title"]].to_json(orient="records"),
        mimetype="application/json"
    )


@app.route("/movies", methods=["GET"])
def get_movies():
    return Response(
        movies[["tmdbId", "title"]].to_json(orient="records"),
        mimetype="application/json"
    )
