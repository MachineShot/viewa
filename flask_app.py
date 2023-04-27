from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import pandas as pd
from ast import literal_eval
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# A very simple Flask Hello World app for you to get started with...

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_world():
    return "Hello from Flask!"


# Load the dataset
movies_df = pd.read_csv("/home/machineshot/mysite/data/tmdb_5000_movies.csv")

# Convert the 'genres' column from a string to a list of dictionaries
movies_df["genres"] = movies_df["genres"].apply(literal_eval)

# Extract the genres from the list of dictionaries
movies_df["genres"] = movies_df["genres"].apply(lambda x: [i["name"] for i in x])

# Create a TF-IDF vectorizer
tfidf = TfidfVectorizer(stop_words="english")

# Replace NaN values in the 'overview' column with an empty string
movies_df["overview"] = movies_df["overview"].fillna("")

# Fit the TF-IDF vectorizer to the 'overview' column
tfidf_matrix = tfidf.fit_transform(movies_df["overview"])

# Compute the cosine similarity matrix
cosine_sim = cosine_similarity(tfidf_matrix)


def get_recommendations(title_list):
    # Get the indices of the movies that match the input titles
    indices = []
    for title in title_list:
        idx = movies_df[movies_df["title"] == title].index[0]
        indices.append(idx)

    # Compute the average cosine similarity between the selected movies and all other movies
    sim_scores = cosine_sim[indices].mean(axis=0)

    # Get the indices of the top 10 movies with the highest similarity scores
    top_indices = sim_scores.argsort()[::-1]

    # Get the titles and IDs of the top 10 movies
    top_movies = []
    for i in top_indices:
        top_movies.append(
            {"id": str(movies_df.iloc[i]["id"]), "title": movies_df.iloc[i]["title"]}
        )

    # Remove the input movies from the recommended list
    for title in title_list:
        for movie in top_movies:
            if movie["title"] == title:
                top_movies.remove(movie)

    return top_movies[:10]


@app.route("/recommendations", methods=["POST"])
def recommend():
    title_list = request.get_json(force=True).get("titles")
    recommendations = get_recommendations(title_list)
    return jsonify({"recommendations": recommendations})


@app.route("/search=<string:search_query>")
def search(search_query):
    movies = movies_df[movies_df["title"].str.contains(search_query, case=False)]
    return Response(
        movies[["id", "title"]].to_json(orient="records"), mimetype="application/json"
    )


@app.route("/movies", methods=["GET"])
def get_movies():
    return Response(
        movies_df[["id", "title"]].to_json(orient="records"),
        mimetype="application/json",
    )
