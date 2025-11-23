# Comedy Shows App

A full-stack application for managing and displaying comedy shows with React frontend, serverless API backend, and Airtable integration.

🌐 **Live Demo:** https://silly-naiad-2a93ee.netlify.app

## Features

- 📅 Display upcoming and past comedy shows
- 🎭 Show details page with comprehensive information
- 🔍 Filter shows by upcoming/past
- 🌐 REST API with Netlify serverless functions
- 📊 Airtable integration for data management
- 🚀 Deployed on Netlify (100% FREE)

## Tech Stack

**Frontend:**
- React 18
- React Router for navigation
- Axios for API calls
- Vite for build tooling

**Backend:**
- Netlify Functions (Serverless)
- Direct Airtable API integration
- Node.js runtime

**Database:**
- Airtable (No-code database)

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- Python 3.9 or higher
- Airtable account with API key

### Airtable Setup

1. Create an Airtable base
2. Create a table named "Shows" with the following fields:
   - `title` (Single line text)
   - `date_time` (Date with time)
   - `location` (Single line text)
   - `description` (Long text)
   - `comedian` (Single line text) - Optional
   - `ticket_price` (Number) - Optional
   - `ticket_url` (URL) - Optional
3. Get your API key from https://airtable.com/account
4. Get your Base ID from the API documentation page

### Local Development

#### Backend Setup

```bash
# Navigate to api directory
cd api

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file in the api directory
cat > .env << EOL
DJANGO_SECRET_KEY=your-secret-key-here
DEBUG=True
AIRTABLE_API_KEY=your-airtable-api-key
AIRTABLE_BASE_ID=your-airtable-base-id
AIRTABLE_TABLE_NAME=Shows
EOL

# Run migrations
python manage.py migrate

# Create superuser (optional, for admin panel)
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

#### Frontend Setup

```bash
# From project root
npm install

# Run development server
npm run dev
```

Visit http://localhost:3000 to see the app.

### API Endpoints

- `GET /api/shows/` - List all shows
- `GET /api/shows/?filter=upcoming` - List upcoming shows
- `GET /api/shows/?filter=past` - List past shows
- `GET /api/shows/:id/` - Get show details

### Deployment to Netlify

The app is deployed at: **https://silly-naiad-2a93ee.netlify.app**

#### Deploy Your Own

1. **Fork this repository** on GitHub

2. **Sign up at Netlify**: https://app.netlify.com

3. **Import your project**:
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Select your forked repository

4. **Add Environment Variables** in Netlify dashboard:
   - `AIRTABLE_API_KEY` - Your Airtable personal access token
   - `AIRTABLE_BASE_ID` - Your Airtable base ID
   - `AIRTABLE_TABLE_NAME` - `Shows`

5. **Deploy** - Netlify will automatically build and deploy

#### How It Works

- Frontend built with Vite and served as static files
- Backend runs as Netlify serverless functions
- Data fetched directly from Airtable
- All hosted on Netlify's free tier

## Project Structure

```
comedy-shows-app/
├── api/                      # Django backend
│   ├── comedy_api/          # Django project settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── shows/               # Shows app
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── airtable_service.py
│   │   └── urls.py
│   ├── manage.py
│   └── requirements.txt
├── src/                     # React frontend
│   ├── components/
│   │   ├── ShowsList.jsx
│   │   └── ShowDetails.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── App.css
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
└── README.md
```

## Usage

### Adding Shows

Shows are managed through Airtable. Add records to your Airtable base, and they will automatically sync when the API is called.

You can also use the Django admin panel:

1. Run `python manage.py createsuperuser`
2. Visit http://localhost:8000/admin
3. Add shows manually

### Manual Sync

Trigger a manual sync from Airtable:

```bash
curl -X POST http://localhost:8000/api/shows/sync/
```

## Troubleshooting

- **CORS errors**: Check that `CORS_ALLOW_ALL_ORIGINS = True` in settings.py
- **Airtable connection errors**: Verify API key and Base ID
- **Date formatting issues**: Ensure dates in Airtable include time
- **Build errors on Vercel**: Check Python version and dependencies

## License

MIT
