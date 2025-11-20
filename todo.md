# Implementation Plan (TODO)

## Phase 1 — Project Setup
- [ ] Create folder structure:
      /landing-page
      /dashboard-user
      /dashboard-admin
      /server
- [ ] Initialize each project environment
- [ ] Configure Git repository

## Phase 2 — Supabase Setup
- [ ] Create Supabase project
- [ ] Retrieve project URL, public key, and service role key
- [ ] Create authentication schema (users table + auth settings)
- [ ] Create tables for:
      - analysis_history
      - user_profiles
      - admin_activity
- [ ] Enable Supabase storage for screenshot uploads (optional)

## Phase 3 — Backend (Node + Express)
- [ ] Implement image upload (Multer)
- [ ] Implement UI element detection logic
- [ ] Implement scoring logic (usability, design, accessibility)
- [ ] Connect to OpenAI for feedback generation
- [ ] Connect backend to Supabase using service role key
- [ ] Create endpoint: POST /api/analyze
- [ ] Create endpoint: GET /api/history
- [ ] Create admin endpoints
- [ ] Test backend routes
- [ ] Deploy backend on Render

## Phase 4 — Landing Page (Next.js)
- [ ] Build hero section
- [ ] Features section
- [ ] Pricing section
- [ ] Footer
- [ ] Add sign-up / login integration (Supabase Auth)
- [ ] Deploy to Vercel

## Phase 5 — User Dashboard (React + TS + Shadcn)
- [ ] Set up protected routes (Supabase Auth)
- [ ] Create upload interface
- [ ] Display bounding boxes overlay
- [ ] Display AI feedback
- [ ] Display scores (usability, design, accessibility)
- [ ] Create history page using Supabase
- [ ] Create account settings page

## Phase 6 — Admin Dashboard
- [ ] Admin login
- [ ] Overview analytics
- [ ] User management page
- [ ] API usage statistics
- [ ] Delete users or reset passwords (if needed)

## Phase 7 — Final Integration
- [ ] Connect dashboards with backend API
- [ ] Final UI polishing
- [ ] Complete mobile responsiveness
- [ ] Add email notifications with Resend
- [ ] Conduct full system testing

## Phase 8 — Deployment
- [ ] Deploy landing page to Vercel
- [ ] Deploy dashboard to Vercel
- [ ] Deploy backend to Render
- [ ] Connect all environment variables
- [ ] Add custom domain (optional)

## Phase 9 — Documentation
- [ ] Write README.md
- [ ] Record demo video
- [ ] Prepare presentation slides
- [ ] Prepare final report

