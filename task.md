# Project Task Document

## Project Title
AI-Powered UX/UI Analyzer

## Project Brief
The AI-Powered UX/UI Analyzer is a web-based platform that allows users to upload screenshots of website or mobile app interfaces. The system uses AI and computer-vision-powered heuristics to detect layout elements such as buttons, text blocks, images, and spacing. It then generates:

- UX analysis
- UI design quality assessment
- Accessibility scores
- Overall usability score
- Visual overlay showing detected elements
- Actionable improvement suggestions

The system will have **three layers**:
1. **Landing Page** – Shows the product, features, pricing, and sign-up.
2. **User Dashboard** – Allows users to upload screenshots, store analysis results, view history, manage account settings, and track improvements.
3. **Admin Dashboard** – Allows management of users, analytics overview, API usage, and admin-level controls.
4. **Server (API)** – Handles image uploads, scoring logic, OpenAI-powered analysis, Supabase integration, authentication, and storage.

The platform will provide:
- Visual overlays showing detected UI components
- AI-generated UX/UI recommendations
- Downloadable feedback reports
- User account system with authentication
- Storage of analysis history

---

## Tech Stack

### Landing Page
- **Next.js**
- Tailwind CSS
- Hosted on **Vercel**

### User & Admin Dashboard
- **React.js**
- **TypeScript**
- **Shadcn UI components**
- Hosted on **Vercel**

### Server / Backend
- **Node.js**
- **Express.js**
- Uses Multer for file uploads
- Uses OpenAI for analysis
- Hosted on **Render**

### Database
- **Supabase**

### Services
- Email Delivery → **Resend**
- Authentication → **Supabase Auth**
- Storage → Supabase Storage or Render File System

---

## Required Supabase Credentials
- **Project URL**
- **Public API Key (frontend)**
- **Secret Service Role Key (server-side only)**

---

## Hosting Plan
- **Vercel** for landing page + dashboards
- **Render** for backend API

