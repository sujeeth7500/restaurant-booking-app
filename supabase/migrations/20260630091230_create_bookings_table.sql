/*
# Create bookings table

1. New Tables
- `bookings`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users, owner)
  - `restaurant_id` (text)
  - `restaurant_name` (text)
  - `table_id` (text)
  - `table_number` (integer)
  - `date` (text)
  - `time` (text)
  - `end_time` (text)
  - `guests` (integer)
  - `customer_name` (text)
  - `customer_email` (text)
  - `customer_phone` (text)
  - `is_priority` (boolean)
  - `created_at` (timestamptz)

2. Security
- Enable RLS on `bookings`.
- Authenticated users can only CRUD their own bookings.
- `user_id` defaults to `auth.uid()` so frontend inserts don't need to pass it.
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  restaurant_id text NOT NULL,
  restaurant_name text NOT NULL,
  table_id text NOT NULL,
  table_number integer NOT NULL,
  date text NOT NULL,
  time text NOT NULL,
  end_time text NOT NULL,
  guests integer NOT NULL DEFAULT 2,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  is_priority boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_bookings" ON bookings;
CREATE POLICY "select_own_bookings" ON bookings FOR SELECT
TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_bookings" ON bookings;
CREATE POLICY "insert_own_bookings" ON bookings FOR INSERT
TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_bookings" ON bookings;
CREATE POLICY "update_own_bookings" ON bookings FOR UPDATE
TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_bookings" ON bookings;
CREATE POLICY "delete_own_bookings" ON bookings FOR DELETE
TO authenticated USING (auth.uid() = user_id);
