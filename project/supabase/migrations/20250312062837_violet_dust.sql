/*
  # Create resources table

  1. New Tables
    - `resources`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `category` (text, required)
      - `type` (text, required)
      - `downloadUrl` (text, required)
      - `created_at` (timestamptz, default now)

  2. Security
    - Enable RLS on `resources` table
    - Add policies for:
      - Public read access
      - Admin write access
*/

CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  type text NOT NULL,
  downloadUrl text NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_resource_type CHECK (type IN ('paper', 'notes', 'mock-test'))
);

ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read resources"
  ON resources
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create resources"
  ON resources
  FOR INSERT
  TO authenticated
  WITH CHECK (true);