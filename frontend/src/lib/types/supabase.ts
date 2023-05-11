export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
      reviews: {
        Row: {
          created_at: string | null
          id: number
          movie_id: number
          profile_id: string
          rating: number
          text: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          movie_id: number
          profile_id: string
          rating: number
          text?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          movie_id?: number
          profile_id?: string
          rating?: number
          text?: string | null
        }
      }
      to_watch: {
        Row: {
          created_at: string | null
          id: number
          movie_id: number | null
          profile_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          movie_id?: number | null
          profile_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          movie_id?: number | null
          profile_id?: string
        }
      }
      watched: {
        Row: {
          created_at: string | null
          id: number
          movie_id: number | null
          profile_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          movie_id?: number | null
          profile_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          movie_id?: number | null
          profile_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_avatar: {
        Args: {
          avatar_url: string
        }
        Returns: Record<string, unknown>
      }
      delete_storage_object: {
        Args: {
          bucket: string
          object: string
        }
        Returns: Record<string, unknown>
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
