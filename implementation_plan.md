# Implementation Plan - Full Platform Rollout

## Goal
Implement the remaining core components of the PixelMetrics Platform: Real Database Integration (Supabase), User Authentication, and the Admin Dashboard.

## User Review Required
> [!IMPORTANT]
> **Supabase Credentials Required**: To proceed with Phase 1, I need your Supabase **Project URL** and **Anon Key**. Please have these ready.

## Phase 1: Database & Backend Integration
### Database Setup
- [ ] **User Action**: Provide Supabase URL and Anon Key.
- [ ] **Agent**: Update `server/.env` with credentials.
- [ ] **Agent**: Run `schema.sql` in Supabase (User may need to do this via Supabase SQL Editor, or I can try if I have connection). *Recommendation: User runs SQL in Supabase Dashboard.*

### Backend Updates
#### [MODIFY] `server/controllers/uploadController.js`
- Remove mock fallback.
- Implement real Supabase Storage upload.

#### [MODIFY] `server/controllers/analyzeController.js`
- Save analysis results to `analysis_history` table in Supabase.

#### [MODIFY] `server/controllers/historyController.js`
- Fetch real data from `analysis_history` table.

## Phase 2: Authentication
### Frontend (`dashboard-user-cra`)
#### [NEW] `src/lib/supabase.ts`
- Initialize Supabase client.

#### [MODIFY] `src/App.tsx`
- Implement `AuthProvider` to manage session state.
- Protect routes (`/dashboard`, `/upload`, `/history`, `/settings`) with `RequireAuth` component.

#### [MODIFY] `src/pages/Login.tsx`
- Implement real Email/Password login using Supabase Auth.
- Add "Sign Up" mode.

## Phase 3: Admin Dashboard Development
### Initialization
- [NEW] Create new React project: `dashboard-admin` (Create React App).
- [NEW] Install dependencies: `tailwindcss`, `lucide-react`, `react-router-dom`, `@supabase/supabase-js`.

### Core Features
- **Dashboard Overview**: Total users, total analyses, recent activity.
- **User Management**: List users, view details, ban/delete users.
- **Analytics**: Charts showing usage trends (using Chart.js or Recharts).

## Verification Plan
### Database & Auth
- Sign up a new user.
- Verify user is created in Supabase `auth.users` and `public.user_profiles`.
- Log in with the new user.
- Upload an image and verify it appears in Supabase Storage and `analysis_history` table.

### Admin Dashboard
- Log in as admin (will need to manually set a user as admin in DB).
- Verify admin can see all user stats.
