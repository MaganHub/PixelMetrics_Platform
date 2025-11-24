# How to Push to GitHub

Follow these steps to push your entire `PixelMetrics_Platform` project to a single GitHub repository.

## 1. Create a Repository on GitHub
1.  Go to [GitHub.com](https://github.com) and log in.
2.  Click the **+** icon in the top-right corner and select **New repository**.
3.  Name it `pixelmetrics-platform` (or any name you prefer).
4.  **Important**: Do NOT check "Initialize this repository with a README", ".gitignore", or "License". Create an empty repository.
5.  Click **Create repository**.
6.  Copy the URL of your new repository (e.g., `https://github.com/yourusername/pixelmetrics-platform.git`).

## 2. Initialize and Push from your Computer

Open your terminal in the `PixelMetrics_Platform` folder and run the following commands one by one:

```bash
# 1. Initialize Git (if not already done)
git init

# 2. Add all files to staging
# (We created a .gitignore for you, so it will skip node_modules)
git add .

# 3. Commit the files
git commit -m "Initial commit: Complete PixelMetrics Platform"

# 4. Rename the branch to main (standard practice)
git branch -M main

# 5. Add your GitHub repository as the 'origin' remote
# REPLACE THE URL BELOW with the one you copied from GitHub
git remote add origin https://github.com/YOUR_USERNAME/pixelmetrics-platform.git

# 6. Push your code
git push -u origin main
```

## 3. Verify
Refresh your GitHub repository page. You should see all your files (`server`, `dashboard-user-cra`, `dashboard-admin`, etc.) listed there.
