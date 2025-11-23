# Deploying to Vercel

## Important Note

Due to Vercel's limitations with Django/Python backends in their free tier, we'll deploy the **frontend only** to Vercel. For the backend, you have two options:

### Option 1: Deploy Backend Separately (Recommended)

Deploy the Django backend to:

- **Railway** (https://railway.app) - Free tier with Python support
- **Render** (https://render.com) - Free tier for web services
- **PythonAnywhere** (https://www.pythonanywhere.com) - Free tier for Django apps
- **Fly.io** (https://fly.io) - Free tier available

### Option 2: Keep Backend Local (For Development)

Keep your Django backend running locally and use ngrok to expose it.

---

## Deploy Frontend to Vercel

### Step 1: Update API URL

Update the API URL to point to your deployed backend (or ngrok URL for local).

Edit `src/components/ShowsList.jsx` and `src/components/ShowDetails.jsx`:

```javascript
const API_URL = "https://your-backend-url.com"; // Replace with your backend URL
const response = await axios.get(`${API_URL}/api/shows/...`);
```

Or use environment variable in `vite.config.js`.

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

From the project root:

```bash
vercel
```

Follow the prompts:

- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? **comedy-shows-app**
- Directory? **./** (press Enter)
- Override settings? **N**

### Step 4: Deploy to Production

```bash
vercel --prod
```

---

## Deploy Backend to Railway (Recommended)

### Step 1: Install Railway CLI

```bash
npm install -g @railway/cli
```

### Step 2: Login

```bash
railway login
```

### Step 3: Initialize and Deploy

```bash
cd api
railway init
railway up
```

### Step 4: Add Environment Variables in Railway Dashboard

- `DJANGO_SECRET_KEY`
- `AIRTABLE_API_KEY`
- `AIRTABLE_BASE_ID`
- `AIRTABLE_TABLE_NAME`
- `DEBUG=False`

### Step 5: Update Frontend to Use Railway Backend URL

Once deployed, Railway will give you a URL like `https://your-app.railway.app`.

Update your frontend API calls to use this URL.

---

## Quick Deploy (Frontend Only to Vercel)

If you want to quickly deploy just the frontend with a placeholder backend:

```bash
# Build the app
npm run build

# Deploy to Vercel
vercel --prod
```

Your app will be live, but you'll need to update the API URL environment variable in Vercel:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add: `VITE_API_URL` with your backend URL
3. Redeploy

---

## Environment Variables Needed

### Vercel (Frontend)

- `VITE_API_URL` - URL of your Django backend

### Backend Host (Railway/Render/etc.)

- `DJANGO_SECRET_KEY` - Generate with: `python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'`
- `AIRTABLE_API_KEY` - Your Airtable token
- `AIRTABLE_BASE_ID` - Your Airtable base ID
- `AIRTABLE_TABLE_NAME` - "Shows"
- `DEBUG` - "False"
- `ALLOWED_HOSTS` - Your deployed domain
