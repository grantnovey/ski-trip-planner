# Deploying Ski Trip Planner to Netlify

This guide walks through deploying the Next.js app to Netlify using the full Next.js runtime (recommended for this project due to server-side redirects and dynamic routes).

---

## Prerequisites

- A [Netlify](https://netlify.com) account
- Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)

---

## Step 1: Push Your Code to Git

If you haven't already:

1. Initialize git in your project (if needed):
   ```bash
   git init
   ```

2. Create a repository on GitHub, GitLab, or Bitbucket.

3. Add the remote and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/skiTripPlanner.git
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

---

## Step 2: Sign In to Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Sign in with your Git provider (GitHub, GitLab, or Bitbucket) or create an account

---

## Step 3: Add a New Site

1. Click **Add new site** → **Import an existing project**
2. Choose **GitHub** (or your Git provider)
3. Authorize Netlify to access your repositories if prompted
4. Search for and select your **skiTripPlanner** repository
5. Click **Import**

---

## Step 4: Configure Build Settings

Netlify usually auto-detects Next.js. Verify or set:

| Setting | Value |
|---------|-------|
| **Branch to deploy** | `main` (or your default branch) |
| **Build command** | `npm run build` |
| **Publish directory** | `.next` (Netlify’s Next.js plugin handles this) |
| **Base directory** | (leave blank unless the app lives in a subfolder) |

---

## Step 5: Environment Variables (Optional)

If you add API keys, database URLs, or other secrets later:

1. In the site build settings, expand **Environment variables**
2. Click **Add a variable** or **Add environment variables**
3. Add keys and values (e.g. `NEXT_PUBLIC_API_URL`, `DATABASE_URL`)

---

## Step 6: Deploy

1. Click **Deploy site** (or **Save** and let it deploy)
2. Wait for the build to finish
3. Netlify will assign a URL like `https://random-name-12345.netlify.app`
4. You can change the site name under **Domain management** → **Options** → **Change site name**

---

## Step 7: Custom Domain (Optional)

1. Go to **Domain management** in your site dashboard
2. Click **Add custom domain** or **Add a domain**
3. Follow the prompts to add your domain
4. Configure DNS per Netlify’s instructions (A/CNAME records or Netlify DNS)

---

## Post-Deploy Checklist

- [ ] Visit the generated URL to confirm the app loads
- [ ] Test the root redirect (`/` → `/trips`)
- [ ] Confirm `/trips` shows the trip list
- [ ] Navigate into a trip and back
- [ ] Create a new trip and confirm it appears

---

## Notes

- **Data persistence**: The app uses `localStorage` via `usePersistedState`, so data is per device/browser and not shared across users.
- **Preview deploys**: Netlify creates preview URLs for pull requests.
- **Build logs**: Use **Deploys** → select a deploy → **Deploy log** to debug build failures.
