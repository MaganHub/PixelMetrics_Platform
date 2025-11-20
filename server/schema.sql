-- Create a table for public user profiles
create table user_profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security
alter table user_profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on user_profiles
  for select using (true);

create policy "Users can insert their own profile." on user_profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on user_profiles
  for update using (auth.uid() = id);

-- This trigger automatically creates a profile entry when a new user signs up
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers
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

-- Create analysis_history table
CREATE TABLE analysis_history (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    screenshot_url TEXT,
    scores JSONB, -- { usability: 8, design: 9, accessibility: 7 }
    feedback TEXT,
    bounding_boxes JSONB -- [ { x, y, width, height, label }, ... ]
);

ALTER TABLE analysis_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own analysis history"
ON analysis_history
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analysis history"
ON analysis_history
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create admin_activity table
CREATE TABLE admin_activity (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    admin_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    activity_type TEXT, -- e.g., 'deleted_user', 'reset_password'
    target_user_id UUID,
    details TEXT
);

ALTER TABLE admin_activity ENABLE ROW LEVEL SECURITY;

-- Assuming you will have an 'admin' role in your app
-- this is just a placeholder and you should configure your RLS to match your authorization rules
CREATE POLICY "Admins can view all activity"
ON admin_activity
FOR SELECT
USING ( (SELECT rolname FROM pg_roles WHERE oid = session_user::regrole) = 'admin' );

CREATE POLICY "Admins can insert activity"
ON admin_activity
FOR INSERT
WITH CHECK ( (SELECT rolname FROM pg_roles WHERE oid = session_user::regrole) = 'admin' );
