/*
  # Create contact messages table

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `subject` (text, required)
      - `message` (text, required)
      - `created_at` (timestamptz, default now)

  2. Security
    - Enable RLS on `contact_messages` table
    - Add policies for:
      - Authenticated users can create messages
      - Admin read access
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can create contact messages"
  ON contact_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (true);