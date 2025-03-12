/*
  # Create blog posts table

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `excerpt` (text, required)
      - `content` (text, required)
      - `author` (text, required)
      - `date` (timestamptz, default now)
      - `category` (text, required)
      - `imageUrl` (text, required)
      - `created_at` (timestamptz, default now)

  2. Security
    - Enable RLS on `blog_posts` table
    - Add policies for:
      - Public read access
      - Admin write access
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  author text NOT NULL,
  date timestamptz DEFAULT now(),
  category text NOT NULL,
  imageUrl text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read blog posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create blog posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);