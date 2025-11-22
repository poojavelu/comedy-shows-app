# 🚀 Deploy Comedy Shows App - Step by Step Guide

Follow these steps exactly to deploy your app to Vercel.

---

## 📋 Before You Start

You need:

1. A GitHub account
2. A Vercel account (free) - Sign up at https://vercel.com

---

## STEP 1: Push Code to GitHub

### 1a. Initialize Git (if not already done)

Open Terminal and run:

```bash
cd /Users/pooja/Downloads/comedy-shows-app/comedy-shows-app
git init
git add .
git commit -m "Initial commit: Comedy Shows App"
```

### 1b. Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `comedy-shows-app`
3. Make it **Public** or **Private** (your choice)
4. **DO NOT** check "Add README" (we already have one)
5. Click **"Create repository"**

### 1c. Push to GitHub

Copy and run these commands (replace `YOUR_USERNAME` with your GitHub username):

```bash
git remote add origin https://github.com/YOUR_USERNAME/comedy-shows-app.git
git branch -M main
git push -u origin main
```

✅ **Checkpoint:** Your code should now be on GitHub!

---

## STEP 2: Deploy Backend to Vercel

### 2a. Sign in to Vercel

1. Go to: https://vercel.com
2. Click **"Sign Up"** or **"Login"**
3. Sign in with your **GitHub** account

### 2b. Create New Project

1. Click **"Add New..."** → **"Project"**
2. Find and select **"comedy-shows-app"** from your repositories
3. Click **"Import"**

### 2c. Configure Backend Deployment

In the project configuration screen:

**Framework Preset:** Select **"Other"**

**Root Directory:** Click **"Edit"** → Type: `backend` → Click **"Continue"**

**Build Settings:**

- Build Command: Leave empty
- Output Directory: Leave empty
- Install Command: `pip install -r requirements.txt`

### 2d. Add Environment Variables

Click **"Environment Variables"** and add these **one by one**:

| Name                  | Value                                                     |
| --------------------- | --------------------------------------------------------- |
| `AIRTABLE_TOKEN`      | `your_airtable_token_here`                                |
| `AIRTABLE_BASE_ID`    | `your_airtable_base_id_here`                              |
| `AIRTABLE_TABLE_NAME` | `Shows`                                                   |
| `SECRET_KEY`          | `django-secret-key-change-this-to-something-random-12345` |
| `DEBUG`               | `False`                                                   |

**How to add each variable:**

1. Type the **Name** in first box
2. Type the **Value** in second box
3. Click **"Add"**
4. Repeat for all variables above

### 2e. Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes while Vercel builds and deploys
3. You'll see "🎉 Congratulations!" when done

### 2f. Get Your Backend URL

After deployment:

1. Click on your project
2. Copy the URL (looks like: `https://comedy-shows-app-backend.vercel.app`)
3. **SAVE THIS URL!** You need it for the next step

✅ **Checkpoint:** Test your backend by visiting: `https://YOUR-BACKEND-URL.vercel.app/api/shows/`

You should see your shows data!

---

## STEP 3: Deploy Frontend to Vercel

### 3a. Add Second Project

1. Go back to Vercel dashboard: https://vercel.com
2. Click **"Add New..."** → **"Project"**
3. Select **"comedy-shows-app"** again (yes, same repository!)
4. Click **"Import"**

### 3b. Configure Frontend Deployment

**Framework Preset:** Select **"Create React App"**

**Root Directory:** Click **"Edit"** → Type: `frontend` → Click **"Continue"**

**Build Settings:**

- Build Command: `npm run build`
- Output Directory: `build`
- Install Command: `npm install`

### 3c. Add Environment Variable

Click **"Environment Variables"** and add:

| Name                | Value                                                                                         |
| ------------------- | --------------------------------------------------------------------------------------------- |
| `REACT_APP_API_URL` | Paste your backend URL from Step 2f (e.g., `https://comedy-shows-app-backend.vercel.app/api`) |

**Important:** Make sure to add `/api` at the end of the URL!

Example: `https://comedy-shows-app-backend.vercel.app/api`

### 3d. Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. You'll see "🎉 Congratulations!" when done

### 3e. Get Your Frontend URL

1. Click on the project
2. Copy the URL (looks like: `https://comedy-shows-app.vercel.app`)
3. **CLICK ON IT** to open your live app!

✅ **Checkpoint:** Your app is now LIVE! 🎉

---

## STEP 4: Update Backend CORS Settings

Your backend needs to allow requests from your frontend domain.

### 4a. Update settings.py

Add your frontend URL to allowed origins:

1. Open: `/Users/pooja/Downloads/comedy-shows-app/comedy-shows-app/backend/comedy_shows/settings.py`

2. Find the line: `CORS_ALLOW_ALL_ORIGINS = True`

3. Replace with:

```python
# CORS settings
ALLOWED_HOSTS = ['*']
CORS_ALLOWED_ORIGINS = [
    'https://YOUR-FRONTEND-URL.vercel.app',  # Replace with your actual frontend URL
    'http://localhost:3000',  # For local development
]
CORS_ALLOW_CREDENTIALS = True
```

4. Replace `YOUR-FRONTEND-URL.vercel.app` with your actual frontend URL

### 4b. Push Changes

```bash
cd /Users/pooja/Downloads/comedy-shows-app/comedy-shows-app
git add .
git commit -m "Update CORS settings for production"
git push
```

Vercel will automatically redeploy both frontend and backend!

---

## 🎉 You're Done!

Your app is now live at your frontend URL!

### Your Live URLs:

**Frontend (User App):** `https://YOUR-FRONTEND-URL.vercel.app`
**Backend (API):** `https://YOUR-BACKEND-URL.vercel.app`

### What Works:

✅ Shows display from Airtable
✅ Filter by Upcoming/Past shows
✅ Click on shows to see details
✅ Click ticket links to buy tickets

---

## 🔧 Troubleshooting

### Backend shows 500 error?

- Check environment variables are set correctly in Vercel
- Go to Vercel → Your Backend Project → Settings → Environment Variables

### Frontend shows empty?

- Make sure `REACT_APP_API_URL` includes `/api` at the end
- Check browser console (F12) for errors

### Shows not loading?

- Visit `https://YOUR-BACKEND-URL.vercel.app/api/shows/` directly
- Should show JSON with your shows

### Need to update environment variables?

1. Go to Vercel dashboard
2. Click your project
3. Go to Settings → Environment Variables
4. Edit the variable
5. Click "Redeploy" in Deployments tab

---

## 📝 Next Steps

### Add More Shows to Airtable:

1. Go to: https://airtable.com
2. Open your "Shows" base
3. Add new shows with these fields:
   - Title (text)
   - Date (YYYY-MM-DD format)
   - Location (text)
   - Description (text)
   - Ticket Link (URL)

Shows will appear automatically in your live app!

### Custom Domain (Optional):

In Vercel:

1. Go to your frontend project
2. Settings → Domains
3. Add your custom domain (e.g., comedyshows.com)
4. Follow Vercel's DNS instructions

---

## 🆘 Need Help?

Common issues and fixes:

**"Module not found" error:**

- Make sure you selected the correct Root Directory (backend or frontend)

**"Build failed":**

- Check the build logs in Vercel
- Usually a missing dependency or environment variable

**CORS errors in browser console:**

- Make sure you updated CORS settings in Step 4
- Frontend URL must match exactly (no trailing slash)

**API returns empty data:**

- Check Airtable token is correct
- Make sure Shows table has data
- Test: `https://YOUR-BACKEND-URL.vercel.app/api/shows/`

---

Good luck! 🚀
