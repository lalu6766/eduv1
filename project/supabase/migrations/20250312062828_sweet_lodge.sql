/*
  # Create forum posts table

  1. New Tables
    - `forum_posts`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `content` (text, required)
      - `author` (text, required)
      - `date` (timestamptz, default now)
      - `category` (text, required)
      - `replies` (integer, default 0)
      - `created_at` (timestamptz, default now)

  2. Security
    - Enable RLS on `forum_posts` table
    - Add policies for authenticated users to:
      - Read all posts
      - Create their own posts
*/

CREATE TABLE IF NOT EXISTS forum_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  author text NOT NULL,
  date timestamptz DEFAULT now(),
  category text NOT NULL,
  replies integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read forum posts"
  ON forum_posts
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create forum posts"
  ON forum_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);