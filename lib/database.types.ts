export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      students: {
        Row: {
          id: number
          name: string
          email: string
          phone_number: string
          gender: string
          created_at: string | null
        }
        Insert: {
          id?: number
          name: string
          email: string
          phone_number?: string
          gender?: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          email?: string
          phone_number?: string
          gender?: string
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
