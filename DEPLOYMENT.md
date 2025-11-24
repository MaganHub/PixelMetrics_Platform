# PixelMetrics Platform - Simplified Deployment Guide

This guide explains how to deploy the entire platform using a **Single Repository** strategy. You do NOT need to create separate repositories for each component.

## 1. One-Time Setup

1.  **Push Code**: Push the entire `PixelMetrics_Platform` folder to a single GitHub repository (e.g., `pixelmetrics-monorepo`).
2.  **Supabase**: Ensure your Supabase project is set up (Database, Auth, Storage) as per the previous guide.

## 2. Deploy Backend (Render)

1.  Go to [Render Dashboard](https://dashboard.render.com/).
2.  Click **New +** -> **Web Service**.
3.  Connect your `pixelmetrics-monorepo` GitHub repository.
4.  **Configuration**:
    *   **Root Directory**: `server`
    *   **Build Command**: `npm install`
    *   **Start Command**: `node index.js`
    *   **Environment Variables**: Add `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAILS`.
5.  Click **Create Web Service**.
6.  **Copy URL**: Once deployed, copy the backend URL (e.g., `https://pixelmetrics-api.onrender.com`).

## 3. Deploy User Dashboard (Vercel)

1.  Go to [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **Add New...** -> **Project**.
3.  Import the **SAME** `pixelmetrics-monorepo` repository.
4.  **Configuration**:
    *   **Framework Preset**: Create React App
    *   **Root Directory**: Click "Edit" and select `dashboard-user-cra`.
    *   **Environment Variables**:
        *   `REACT_APP_SUPABASE_URL`: Your Supabase URL.
        *   `REACT_APP_SUPABASE_ANON_KEY`: Your Supabase Anon Key.
        *   `REACT_APP_API_URL`: The Render Backend URL from Step 2 (e.g., `https://pixelmetrics-api.onrender.com/api`).
5.  Click **Deploy**.

## 4. Deploy Admin Dashboard (Vercel)

1.  Go to [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **Add New...** -> **Project**.
3.  Import the **SAME** `pixelmetrics-monorepo` repository again.
4.  **Configuration**:
    *   **Framework Preset**: Vite
    *   **Root Directory**: Click "Edit" and select `dashboard-admin`.
    *   **Environment Variables**:
        *   `VITE_SUPABASE_URL`: Your Supabase URL.
        *   `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon Key.
        *   `VITE_API_URL`: The Render Backend URL from Step 2 (e.g., `https://pixelmetrics-api.onrender.com/api`).
5.  Click **Deploy**.

## 5. Local Development (Simplified)

We have added a root `package.json` to simplify local development.

1.  **Install All Dependencies**:
    ```bash
    npm run install:all
    ```

2.  **Start Everything**:
    ```bash
    npm start
    ```
    This single command will start:
    *   Backend: `http://localhost:3001`
    *   User Dashboard: `http://localhost:3000`
    *   Admin Dashboard: `http://localhost:3003`
