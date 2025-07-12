import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const createClient = () => createClientComponentClient()

export const createServerClient = () => createServerComponentClient({ cookies })

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          role: 'admin' | 'trainer' | 'trainee' | 'agent' | 'consultant'
          organization_id: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          role: 'admin' | 'trainer' | 'trainee' | 'agent' | 'consultant'
          organization_id?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: 'admin' | 'trainer' | 'trainee' | 'agent' | 'consultant'
          organization_id?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          domain: string
          settings: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          domain: string
          settings?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          domain?: string
          settings?: any
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string
          language: string
          level: 'beginner' | 'intermediate' | 'advanced'
          duration_weeks: number
          trainer_id: string
          organization_id: string
          status: 'draft' | 'published' | 'archived'
          thumbnail_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          language: string
          level: 'beginner' | 'intermediate' | 'advanced'
          duration_weeks: number
          trainer_id: string
          organization_id: string
          status?: 'draft' | 'published' | 'archived'
          thumbnail_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          language?: string
          level?: 'beginner' | 'intermediate' | 'advanced'
          duration_weeks?: number
          trainer_id?: string
          organization_id?: string
          status?: 'draft' | 'published' | 'archived'
          thumbnail_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      chapters: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string
          day_number: number
          video_url: string | null
          notes: string | null
          duration_minutes: number | null
          zoom_meeting_id: string | null
          scheduled_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          description: string
          day_number: number
          video_url?: string | null
          notes?: string | null
          duration_minutes?: number | null
          zoom_meeting_id?: string | null
          scheduled_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          description?: string
          day_number?: number
          video_url?: string | null
          notes?: string | null
          duration_minutes?: number | null
          zoom_meeting_id?: string | null
          scheduled_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      assessments: {
        Row: {
          id: string
          chapter_id: string
          title: string
          questions: any
          passing_score: number
          time_limit_minutes: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          chapter_id: string
          title: string
          questions: any
          passing_score: number
          time_limit_minutes?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          chapter_id?: string
          title?: string
          questions?: any
          passing_score?: number
          time_limit_minutes?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      enrollments: {
        Row: {
          id: string
          user_id: string
          course_id: string
          status: 'active' | 'completed' | 'dropped'
          progress_percentage: number
          enrolled_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          status?: 'active' | 'completed' | 'dropped'
          progress_percentage?: number
          enrolled_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          status?: 'active' | 'completed' | 'dropped'
          progress_percentage?: number
          enrolled_at?: string
          completed_at?: string | null
        }
      }
      submissions: {
        Row: {
          id: string
          consultant_id: string
          agent_id: string
          client_name: string
          position: string
          status: 'submitted' | 'interview' | 'selected' | 'rejected'
          submitted_at: string
          updated_at: string
          notes: string | null
        }
        Insert: {
          id?: string
          consultant_id: string
          agent_id: string
          client_name: string
          position: string
          status?: 'submitted' | 'interview' | 'selected' | 'rejected'
          submitted_at?: string
          updated_at?: string
          notes?: string | null
        }
        Update: {
          id?: string
          consultant_id?: string
          agent_id?: string
          client_name?: string
          position?: string
          status?: 'submitted' | 'interview' | 'selected' | 'rejected'
          submitted_at?: string
          updated_at?: string
          notes?: string | null
        }
      }
    }
  }
}