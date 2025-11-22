# Deployment Guide - Comedy Shows App

## 🚀 Quick Deployment to Vercel

This guide will help you deploy both the frontend and backend to Vercel.

### Prerequisites

- GitHub account
- Vercel account (free tier works)
- SendGrid account for email functionality

---

## Step 1: Prepare Your Repository

1. **Initialize Git repository:**

   ```bash
   cd /Users/pooja/Downloads/comedy-shows-app/comedy-shows-app
   git init
   git add .
   git commit -m "Initial commit: Comedy Shows App"
   ```

2. **Create GitHub repository:**

   - Go to [github.com](https://github.com/new)
   - Create a new repository named `comedy-shows-app`
   - Don't initialize with README (we already have one)

3. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/poojavelu/comedy-shows-app.git
   git branch -M main
   git push -u origin main
   ```

---

## Step 2: Deploy Backend to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com) and sign in**

2. **Click "Add New Project"**

3. **Import your GitHub repository**

4. **Configure the project:**

   - Framework Preset: `Other`
   - Root Directory: `backend`
   - Build Command: Leave empty
   - Output Directory: Leave empty

5. **Add Environment Variables:**
   Click "Environment Variables" and add:

   ```
   AIRTABLE_TOKEN=your_airtable_token_here
   AIRTABLE_BASE_ID=your_airtable_base_id_here
   AIRTABLE_TABLE_NAME=Shows
   SENDGRID_API_KEY=your_sendgrid_api_key_here
   FROM_EMAIL=admin@comedyuo.com
   SECRET_KEY=django-insecure-your-secret-key-change-this
   DEBUG=False
   ```

6. **Click "Deploy"**

7. **Note your backend URL** (e.g., `https://comedy-shows-backend.vercel.app`)

### Option B: Via CLI

```bash
cd backend
vercel

# Follow prompts:
# Set up and deploy: Y
# Which scope: your-username
# Link to existing project: N
# What's your project's name: comedy-shows-backend
# In which directory is your code located: ./
# Want to override settings: N

# After deployment, add environment variables:
vercel env add AIRTABLE_TOKEN
vercel env add AIRTABLE_BASE_ID
vercel env add AIRTABLE_TABLE_NAME
vercel env add SENDGRID_API_KEY
vercel env add FROM_EMAIL
vercel env add SECRET_KEY
vercel env add DEBUG

# Redeploy with environment variables:
vercel --prod
```

---

## Step 3: Deploy Frontend to Vercel

1. **Update frontend environment variable:**

   Edit `frontend/.env`:

   ```env
   REACT_APP_API_URL=https://your-backend-url.vercel.app/api
   ```

   Replace with your actual backend URL from Step 2.

2. **Commit the change:**

   ```bash
   git add frontend/.env
   git commit -m "Update API URL for production"
   git push
   ```

3. **Deploy via Vercel Dashboard:**
   - Click "Add New Project" again
   - Import the same repository
   - Configure:
     - Framework Preset: `Create React App`
     - Root Directory: `frontend`
     - Build Command: `npm run build`
     - Output Directory: `build`
4. **Add Environment Variable:**

   ```
   REACT_APP_API_URL=https://your-backend-url.vercel.app/api
   ```

5. **Click "Deploy"**

6. **Your frontend is live!** 🎉

---

## Step 4: Get Your SendGrid API Key

1. **Sign up at [sendgrid.com](https://sendgrid.com)**

2. **Verify your email**

3. **Create an API Key:**

   - Go to Settings → API Keys
   - Click "Create API Key"
   - Name: "Comedy Shows App"
   - Permissions: "Full Access"
   - Copy the key

4. **Verify sender email:**

   - Go to Settings → Sender Authentication
   - Verify your sender email (e.g., admin@comedyuo.com)

5. **Update Vercel backend environment variable:**
   - Go to your backend project in Vercel
   - Settings → Environment Variables
   - Update `SENDGRID_API_KEY` with your key
   - Redeploy

---

## Step 5: Test Your Deployment

1. **Visit your frontend URL**

2. **Verify shows are loading from Airtable**

3. **Test filtering** (All Shows, Upcoming, Past)

4. **Click on a show** to view details

5. **Test email sending:**
   - Click "Send Email Invite" button
   - Check poojavelu23@gmail.com for the email

---

## 🔧 Troubleshooting

### Backend Issues

**"Application error" on backend:**

- Check Vercel logs: Project → Deployments → Click deployment → View Logs
- Verify all environment variables are set
- Ensure `vercel.json` is in backend directory

**CORS errors:**

- Backend `settings.py` has `CORS_ALLOW_ALL_ORIGINS = True`
- If needed, set specific origins in production

### Frontend Issues

**"Failed to fetch" errors:**

- Verify `REACT_APP_API_URL` points to correct backend URL
- Check browser console for exact error
- Ensure backend is deployed and running

**Shows not loading:**

- Check Airtable credentials
- Verify Airtable table has data
- Check backend API directly: `https://your-backend.vercel.app/api/shows/`

### Email Issues

**Emails not sending:**

- Verify SendGrid API key is correct
- Check sender email is verified in SendGrid
- Review SendGrid Activity dashboard
- Check Vercel backend logs for errors

---

## 📊 Monitoring

### Vercel Dashboard

- View deployment logs
- Monitor function invocations
- Check error rates

### Airtable

- View and edit show data
- Add new shows directly
- Changes reflect immediately in app

### SendGrid

- Monitor email delivery
- Check bounce rates
- View email activity

---

## 🔄 Making Updates

### Update Backend Code

```bash
cd backend
# Make your changes
git add .
git commit -m "Update: description"
git push
# Vercel auto-deploys
```

### Update Frontend Code

```bash
cd frontend
# Make your changes
git add .
git commit -m "Update: description"
git push
# Vercel auto-deploys
```

### Update Shows Data

- Simply edit your Airtable
- Changes appear immediately
- No deployment needed!

---

## 📱 Share Your App

After successful deployment, share:

1. **Frontend URL**: `https://your-app.vercel.app`
2. **GitHub Repo**: `https://github.com/poojavelu/comedy-shows-app`
3. **Airtable Base**: For team members who need to edit shows

---

## ✅ Deployment Checklist

- [ ] Repository pushed to GitHub
- [ ] Backend deployed to Vercel
- [ ] Backend environment variables configured
- [ ] SendGrid API key obtained and added
- [ ] Frontend deployed to Vercel
- [ ] Frontend environment variable updated with backend URL
- [ ] Airtable has sample show data
- [ ] Website loads and displays shows
- [ ] Filtering works (Upcoming/Past)
- [ ] Show details page works
- [ ] Email sending works
- [ ] Both URLs documented in README

---

## 🎉 You're Done!

Your comedy shows app is now live and ready to use!

**Next Steps:**

- Add more shows in Airtable
- Customize the styling
- Share with friends and colleagues
- Monitor usage in Vercel dashboard

Need help? Contact: poojavelu23@gmail.com
