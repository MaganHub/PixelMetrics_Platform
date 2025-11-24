# Supabase Setup Guide

Follow these steps to configure your Supabase project for the PixelMetrics Platform.

## 1. Create Project
1.  Go to [Supabase.com](https://supabase.com) and sign in.
2.  Click **New Project**.
3.  Choose your organization, name the project (e.g., `pixelmetrics`), set a database password, and choose a region.
4.  Click **Create new project**.

## 2. Database Setup (Run SQL)
1.  In your Supabase dashboard, go to the **SQL Editor** (icon on the left sidebar).
2.  Click **New Query**.
3.  Copy and paste the following SQL code into the editor:

```sql
-- 1. Create User Profiles Table
create table user_profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  constraint username_length check (char_length(username) >= 3)
);

-- 2. Enable RLS for Profiles
alter table user_profiles enable row level security;

create policy "Public profiles are viewable by everyone." on user_profiles
  for select using (true);

create policy "Users can insert their own profile." on user_profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on user_profiles
  for update using (auth.uid() = id);

-- 3. Create Trigger for New Users
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 4. Create Analysis History Table
CREATE TABLE analysis_history (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    screenshot_url TEXT,
    scores JSONB,
    feedback TEXT,
    bounding_boxes JSONB
);

ALTER TABLE analysis_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own analysis history"
ON analysis_history FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analysis history"
ON analysis_history FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 5. Create Admin Activity Table
CREATE TABLE admin_activity (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    admin_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    activity_type TEXT,
    target_user_id UUID,
    details TEXT
);

ALTER TABLE admin_activity ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to insert (for now, logic handled in backend)
CREATE POLICY "Enable insert for authenticated users only" 
ON admin_activity FOR INSERT TO authenticated WITH CHECK (true);

-- Allow all authenticated users to select (for now, logic handled in backend)
CREATE POLICY "Enable select for authenticated users only" 
ON admin_activity FOR SELECT TO authenticated USING (true);
```
4.  Click **Run** (bottom right).

## 3. Storage Setup
1.  Go to **Storage** (icon on the left sidebar).
2.  Click **New Bucket**.
3.  Name the bucket: `screenshots`.
4.  **Important**: Toggle "Public bucket" to **ON**.
5.  Click **Save**.

## 4. Get API Keys
1.  Go to **Project Settings** (gear icon) -> **API**.
2.  Copy the **Project URL**.
3.  Copy the **anon** public key.
4.  Copy the **service_role** secret key (Click "Reveal").

## 5. Update Environment Variables
Update your `.env` files locally and in your deployment platforms (Vercel/Render) with these values.

*   `SUPABASE_URL`: Your Project URL
*   `SUPABASE_ANON_KEY`: Your anon key
*   `SUPABASE_SERVICE_ROLE_KEY`: Your service_role key
