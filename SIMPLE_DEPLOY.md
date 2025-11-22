# 🚀 Deploy Full Stack App to Vercel - Single Deployment

Deploy both frontend and backend together in ONE project!

---

## STEP 1: Push to GitHub

```bash
cd /Users/pooja/Downloads/comedy-shows-app/comedy-shows-app

# Initialize git
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub (https://github.com/new) then:
git remote add origin https://github.com/YOUR_USERNAME/comedy-shows-app.git
git branch -M main
git push -u origin main
```

---

## STEP 2: Deploy to Vercel (ONE Project!)

### 2a. Go to Vercel

- Visit: https://vercel.com
- Sign in with GitHub

### 2b. Import Project

- Click **"Add New..."** → **"Project"**
- Select **"comedy-shows-app"**
- Click **"Import"**

### 2c. Configure

**Framework Preset:** Select **"Create React App"**

**Root Directory:** Leave as **`./`** (root)

**Build Settings:**

- Build Command: `cd frontend && npm install && npm run build`
- Output Directory: `frontend/build`
- Install Command: `cd backend && pip install -r requirements.txt`

### 2d. Environment Variables

Add these in Vercel:

```
AIRTABLE_TOKEN=your_airtable_token_here
AIRTABLE_BASE_ID=your_airtable_base_id_here
AIRTABLE_TABLE_NAME=Shows
SECRET_KEY=django-secret-random-key-12345
DEBUG=False
```

### 2e. Deploy!

Click **"Deploy"** and wait 3-4 minutes.

---

## ✅ Done!

Your app will be live at: `https://comedy-shows-app.vercel.app`

- Frontend: Served from root `/`
- Backend API: Available at `/api/shows/`

---

## 🔧 If You Get Errors

**Build fails?**

- Check the build logs in Vercel
- Make sure all dependencies are in requirements.txt

**API not working?**

- The `/api` endpoint might need serverless function setup
- For simplest deployment, use the **2-project method** in DEPLOY_GUIDE.md

---

## 💡 Recommendation

For Python Django + React apps, **deploying as 2 separate projects is actually easier**:

- Backend → One Vercel project
- Frontend → Another Vercel project

Follow **DEPLOY_GUIDE.md** for the easier method!
