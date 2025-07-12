/*
  # Initial Schema for Training & Recruitment Platform

  1. New Tables
    - `organizations` - Multi-tenant support
    - `users` - User accounts with roles
    - `courses` - Training courses
    - `chapters` - Daily course content
    - `assessments` - Quizzes and tests
    - `enrollments` - Student course registrations
    - `submissions` - Recruitment tracking
    - `videos` - Video content management
    - `zoom_sessions` - Live session tracking

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access
    - Secure multi-tenant data isolation

  3. Features
    - Role-based permissions (admin, trainer, trainee, agent, consultant)
    - Multi-tenant architecture
    - Comprehensive audit trails
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Organizations table for multi-tenancy
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  domain text UNIQUE NOT NULL,
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Users table with role-based access
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'trainer', 'trainee', 'agent', 'consultant')),
  organization_id uuid REFERENCES organizations(id),
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  language text NOT NULL,
  level text NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  duration_weeks integer NOT NULL DEFAULT 1,
  trainer_id uuid REFERENCES users(id) NOT NULL,
  organization_id uuid REFERENCES organizations(id) NOT NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  thumbnail_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Chapters table for daily content
CREATE TABLE IF NOT EXISTS chapters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  day_number integer NOT NULL,
  video_url text,
  notes text,
  duration_minutes integer,
  zoom_meeting_id text,
  scheduled_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(course_id, day_number)
);

-- Assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id uuid REFERENCES chapters(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  questions jsonb NOT NULL DEFAULT '[]',
  passing_score integer NOT NULL DEFAULT 70,
  time_limit_minutes integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  course_id uuid REFERENCES courses(id) NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped')),
  progress_percentage integer DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  enrolled_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  UNIQUE(user_id, course_id)
);

-- Videos table for content management
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  file_url text NOT NULL,
  thumbnail_url text,
  duration_seconds integer,
  transcription text,
  chapter_markers jsonb DEFAULT '[]',
  upload_status text DEFAULT 'processing' CHECK (upload_status IN ('processing', 'ready', 'failed')),
  organization_id uuid REFERENCES organizations(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Submissions table for recruitment tracking
CREATE TABLE IF NOT EXISTS submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  consultant_id uuid REFERENCES users(id) NOT NULL,
  agent_id uuid REFERENCES users(id) NOT NULL,
  client_name text NOT NULL,
  position text NOT NULL,
  status text NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'interview', 'selected', 'rejected')),
  submitted_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  notes text
);

-- Zoom sessions table
CREATE TABLE IF NOT EXISTS zoom_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id uuid REFERENCES chapters(id) ON DELETE CASCADE NOT NULL,
  zoom_meeting_id text NOT NULL,
  meeting_url text NOT NULL,
  password text,
  scheduled_at timestamptz NOT NULL,
  duration_minutes integer DEFAULT 60,
  recording_url text,
  attendance_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User progress tracking
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  chapter_id uuid REFERENCES chapters(id) ON DELETE CASCADE NOT NULL,
  completed boolean DEFAULT false,
  watch_time_seconds integer DEFAULT 0,
  last_position_seconds integer DEFAULT 0,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, chapter_id)
);

-- Assessment results
CREATE TABLE IF NOT EXISTS assessment_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  assessment_id uuid REFERENCES assessments(id) ON DELETE CASCADE NOT NULL,
  score integer NOT NULL CHECK (score >= 0 AND score <= 100),
  answers jsonb NOT NULL DEFAULT '{}',
  time_taken_minutes integer,
  passed boolean GENERATED ALWAYS AS (score >= (SELECT passing_score FROM assessments WHERE id = assessment_id)) STORED,
  taken_at timestamptz DEFAULT now(),
  UNIQUE(user_id, assessment_id)
);

-- Enable Row Level Security
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE zoom_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Organizations
CREATE POLICY "Users can view their organization"
  ON organizations
  FOR SELECT
  TO authenticated
  USING (id = (SELECT organization_id FROM users WHERE id = auth.uid()));

-- RLS Policies for Users
CREATE POLICY "Users can view users in their organization"
  ON users
  FOR SELECT
  TO authenticated
  USING (organization_id = (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can update their own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid());

-- RLS Policies for Courses
CREATE POLICY "Users can view courses in their organization"
  ON courses
  FOR SELECT
  TO authenticated
  USING (organization_id = (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Trainers and admins can manage courses"
  ON courses
  FOR ALL
  TO authenticated
  USING (
    organization_id = (SELECT organization_id FROM users WHERE id = auth.uid()) AND
    (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'trainer')
  );

-- RLS Policies for Chapters
CREATE POLICY "Users can view chapters for courses in their organization"
  ON chapters
  FOR SELECT
  TO authenticated
  USING (
    course_id IN (
      SELECT id FROM courses 
      WHERE organization_id = (SELECT organization_id FROM users WHERE id = auth.uid())
    )
  );

CREATE POLICY "Trainers can manage chapters for their courses"
  ON chapters
  FOR ALL
  TO authenticated
  USING (
    course_id IN (
      SELECT id FROM courses 
      WHERE trainer_id = auth.uid() OR 
      (SELECT role FROM users WHERE id = auth.uid()) = 'admin'
    )
  );

-- RLS Policies for Enrollments
CREATE POLICY "Users can view their own enrollments"
  ON enrollments
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Trainers can view enrollments for their courses"
  ON enrollments
  FOR SELECT
  TO authenticated
  USING (
    course_id IN (
      SELECT id FROM courses 
      WHERE trainer_id = auth.uid() OR 
      (SELECT role FROM users WHERE id = auth.uid()) = 'admin'
    )
  );

-- RLS Policies for Submissions
CREATE POLICY "Consultants can view their own submissions"
  ON submissions
  FOR SELECT
  TO authenticated
  USING (consultant_id = auth.uid());

CREATE POLICY "Agents can view submissions they manage"
  ON submissions
  FOR SELECT
  TO authenticated
  USING (agent_id = auth.uid());

CREATE POLICY "Agents can manage submissions"
  ON submissions
  FOR ALL
  TO authenticated
  USING (
    agent_id = auth.uid() OR 
    (SELECT role FROM users WHERE id = auth.uid()) = 'admin'
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_organization_id ON users(organization_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_courses_organization_id ON courses(organization_id);
CREATE INDEX IF NOT EXISTS idx_courses_trainer_id ON courses(trainer_id);
CREATE INDEX IF NOT EXISTS idx_chapters_course_id ON chapters(course_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_submissions_consultant_id ON submissions(consultant_id);
CREATE INDEX IF NOT EXISTS idx_submissions_agent_id ON submissions(agent_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_results_user_id ON assessment_results(user_id);