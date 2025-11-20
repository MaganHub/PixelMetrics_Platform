# Supabase Database Schema

## Tables

### 1. users (Provided by Supabase Auth)
- id (uuid) - Primary Key
- email
- created_at
- updated_at

### 2. user_profiles
- id (uuid) - PK (same as users.id)
- full_name
- plan_type (free, pro, enterprise)
- usage_count
- profile_image_url
- created_at
- updated_at

### 3. analysis_history
- id (uuid) - Primary Key
- user_id (uuid) - FK → users.id
- screenshot_url
- ai_feedback (text)
- usability_score (int)
- accessibility_score (int)
- design_score (int)
- analysis_boxes (json)
- created_at (timestamp)

### 4. admin_activity
- id (uuid)
- admin_id (uuid)
- action (text)
- created_at

---

## Storage Buckets (Optional)
- **screenshots/** → For uploaded UI screenshots

---

## Authentication
- Supabase Auth (email & password)
- Redirect URLs:
  - Landing page login
  - Dashboard user login
  - Admin login

---

## Required API Keys
**Frontend (public):**
- SUPABASE_URL
- SUPABASE_ANON_KEY

**Backend (server-only):**
- SUPABASE_SERVICE_ROLE_KEY
- SUPABASE_URL

