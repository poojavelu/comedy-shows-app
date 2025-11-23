# Deploy to Vercel - Full Stack

## Quick Deploy Steps

### 1. Make sure you're logged in to Vercel
```bash
vercel login
```

### 2. Deploy to Vercel
```bash
vercel
```

Follow the prompts and select default options.

### 3. Add Environment Variables in Vercel Dashboard

Go to your project settings at: https://vercel.com/[your-username]/comedy-shows-app/settings/environment-variables

Add these variables for **Production**, **Preview**, and **Development**:

- **DJANGO_SECRET_KEY**: Generate one with: 
  ```bash
  python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
  ```
- **AIRTABLE_API_KEY**: `your-airtable-api-key`
- **AIRTABLE_BASE_ID**: `your-airtable-base-id`
- **AIRTABLE_TABLE_NAME**: `Shows`
- **DEBUG**: `False`

### 4. Deploy to Production
```bash
vercel --prod
```

## Important Notes

### Database
- Vercel serverless functions are stateless
- SQLite won't persist between deployments
- Data is fetched directly from Airtable on each request
- All CRUD operations sync with Airtable

### How it Works
1. **Frontend** (React/Vite): Built and served as static files
2. **Backend** (Django): Runs as serverless functions at `/api/*`
3. **Data**: Stored in and synced with Airtable

### Troubleshooting

If deployment fails:
1. Check build logs in Vercel dashboard
2. Verify all environment variables are set
3. Make sure `requirements.txt` is in the root directory

### Local Development

Backend:
```bash
cd api
./venv/bin/python manage.py runserver
```

Frontend:
```bash
npm run dev
```

Visit http://localhost:3000
