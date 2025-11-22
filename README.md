# Comedy Shows Tickets App 🎭

A full-stack web application for managing and displaying comedy show tickets, built with React frontend and Django backend, integrated with Airtable for data management.

## 🌟 Features

- **Show Listings**: Display comedy shows with title, date, location, and description
- **Show Details**: Dedicated page for each show with full information
- **Filters**: Toggle between "All Shows", "Upcoming", and "Past Shows"
- **Email Notifications**: Send personalized email invites to guests using custom HTML templates
- **Airtable Integration**: Manage show data using Airtable's no-code interface
- **CRUD Operations**: Full Create, Read, Update, Delete functionality via REST API
- **Responsive Design**: Mobile-friendly interface

## 🏗️ Tech Stack

### Frontend

- React 18.2
- React Router DOM for navigation
- Axios for API calls
- CSS3 for styling

### Backend

- Django 4.2.7
- Django REST Framework
- Airtable API (pyairtable)
- SendGrid for email delivery
- CORS headers for cross-origin requests

### No-Code Tool

- Airtable for data management

## 📁 Project Structure

```
comedy-shows-app/
├── backend/
│   ├── comedy_shows/          # Django project settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── shows/                 # Django app for shows
│   │   ├── views.py           # API endpoints
│   │   ├── urls.py
│   │   ├── airtable_service.py
│   │   └── email_service.py
│   ├── templates/
│   │   └── email_template.html
│   ├── requirements.txt
│   ├── manage.py
│   └── vercel.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ShowsList.js
│   │   │   └── ShowDetail.js
│   │   ├── api/
│   │   │   └── shows.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── vercel.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn
- Airtable account
- SendGrid account (for email functionality)

### Backend Setup

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Create virtual environment:**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables:**
   Create a `.env` file in the `backend` directory:

   ```env
   AIRTABLE_TOKEN=your_airtable_token_here
   AIRTABLE_BASE_ID=your_airtable_base_id_here
   AIRTABLE_TABLE_NAME=Shows
   SENDGRID_API_KEY=your_sendgrid_api_key
   FROM_EMAIL=admin@comedyuo.com
   SECRET_KEY=your-secret-key-here
   DEBUG=True
   ```

5. **Run migrations:**

   ```bash
   python manage.py migrate
   ```

6. **Start the development server:**

   ```bash
   python manage.py runserver
   ```

   Backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the `frontend` directory:

   ```env
   REACT_APP_API_URL=http://localhost:8000/api
   ```

4. **Start the development server:**

   ```bash
   npm start
   ```

   Frontend will be available at `http://localhost:3000`

## 📡 API Endpoints

### Shows

- **GET** `/api/shows/` - Get all shows
  - Query params: `?filter=upcoming` or `?filter=past`
- **POST** `/api/shows/` - Create a new show
- **GET** `/api/shows/{id}/` - Get a specific show
- **PUT** `/api/shows/{id}/` - Update a show
- **DELETE** `/api/shows/{id}/` - Delete a show

### Email

- **POST** `/api/send-email/` - Send email to guest
  ```json
  {
    "email": "poojavelu23@gmail.com",
    "first_name": "Pooja",
    "show_id": "recXXXXXXXXXXXXX"
  }
  ```

## 🗄️ Airtable Setup

1. **Access your Airtable base:**

   - Base ID: `app5bkK7di2irGD5m`
   - Table: `Shows`

2. **Table structure:**

   - Title (Single line text)
   - Date (Date field, format: YYYY-MM-DD)
   - Location (Single line text)
   - Description (Long text)
   - Ticket Link (URL)

3. **Add sample data:** See `AIRTABLE_SETUP.md` for detailed instructions

## 📧 SendGrid Setup

1. Create a SendGrid account at [sendgrid.com](https://sendgrid.com)
2. Create an API key
3. Add the API key to your `.env` file
4. Verify your sender email address in SendGrid

## 🌐 Deployment to Vercel

### Deploy Backend

1. **Install Vercel CLI:**

   ```bash
   npm install -g vercel
   ```

2. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

3. **Deploy:**

   ```bash
   vercel
   ```

4. **Add environment variables in Vercel dashboard:**

   - AIRTABLE_TOKEN
   - AIRTABLE_BASE_ID
   - AIRTABLE_TABLE_NAME
   - SENDGRID_API_KEY
   - FROM_EMAIL
   - SECRET_KEY
   - DEBUG=False

5. **Note your backend URL** (e.g., `https://your-backend.vercel.app`)

### Deploy Frontend

1. **Navigate to frontend directory:**

   ```bash
   cd frontend
   ```

2. **Update `.env` with production backend URL:**

   ```env
   REACT_APP_API_URL=https://your-backend.vercel.app/api
   ```

3. **Deploy:**

   ```bash
   vercel
   ```

4. **Your app is live!** 🎉

## 🔧 Development

### Running Tests

Backend:

```bash
cd backend
python manage.py test
```

Frontend:

```bash
cd frontend
npm test
```

### Code Structure

- **Frontend Components:**

  - `ShowsList.js` - Main listing page with filters
  - `ShowDetail.js` - Individual show details page

- **Backend Services:**
  - `airtable_service.py` - Airtable integration
  - `email_service.py` - SendGrid email integration
  - `views.py` - REST API endpoints

## 🎯 Features Breakdown

### 1. Show Management (CRUD)

- Create, read, update, delete shows via API
- Airtable as the backend database
- Real-time sync between Airtable and app

### 2. Email System

- HTML email templates with dynamic content
- Personalization with recipient's first name
- SendGrid integration for reliable delivery
- Button-triggered from show detail page

### 3. Filtering

- View all shows
- Filter upcoming shows (date >= today)
- Filter past shows (date < today)

### 4. No-Code Integration

- Airtable provides easy data management
- Non-technical users can add/edit shows
- Form integration possible for submissions

## 🐛 Troubleshooting

**CORS Issues:**

- Ensure `django-cors-headers` is installed
- Check `CORS_ALLOW_ALL_ORIGINS` in settings.py

**Airtable Connection:**

- Verify API token is correct
- Check base ID and table name
- Ensure table structure matches expected fields

**Email Not Sending:**

- Verify SendGrid API key
- Check sender email is verified in SendGrid
- Review SendGrid activity logs

## 📝 License

This project is created for demonstration purposes.

## 👥 Contact

For questions or support, contact: poojavelu23@gmail.com

## 🚀 Live Links

- **Frontend**: [Your Vercel Frontend URL]
- **Backend API**: [Your Vercel Backend URL]
- **GitHub Repo**: [Your GitHub Repository URL]

---

Built with ❤️ for comedy lovers
