export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

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
        }
        Insert: {
          id?: number
          name: string
          email: string
          phone_number?: string
          gender?: string
        }
        Update: {
          id?: number
          name?: string
          email?: string
          phone_number?: string
          gender?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
