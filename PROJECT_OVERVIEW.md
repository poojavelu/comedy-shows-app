# 🎭 Comedy Shows Tickets App - Project Overview

## 📋 Project Summary

A full-stack web application for managing comedy show tickets with the following components:

- **Frontend**: React application with show listings, details pages, and filtering
- **Backend**: Django REST API with Airtable integration
- **Email System**: SendGrid integration with HTML email templates
- **No-Code Tool**: Airtable for data management

---

## ✅ Completed Features

### 1. **React Frontend** ✓

- ✅ Show listings page with grid layout
- ✅ Individual show details page
- ✅ Filters: All Shows, Upcoming, Past Shows
- ✅ Responsive design (mobile-friendly)
- ✅ Email invite button on detail page
- ✅ Clean, professional UI with branded colors
- ✅ React Router for navigation
- ✅ Axios for API communication

### 2. **Django Backend API** ✓

- ✅ RESTful API endpoints
- ✅ GET /api/shows/ - List all shows (with filters)
- ✅ GET /api/shows/{id}/ - Get show details
- ✅ POST /api/shows/ - Create new show
- ✅ PUT /api/shows/{id}/ - Update show
- ✅ DELETE /api/shows/{id}/ - Delete show
- ✅ POST /api/send-email/ - Send email to guest
- ✅ CORS configuration
- ✅ Error handling

### 3. **Airtable Integration** ✓

- ✅ Airtable as backend database
- ✅ pyairtable SDK integration
- ✅ CRUD operations on Airtable records
- ✅ Real-time data synchronization
- ✅ Configuration: Base ID, Table Name, API Token
- ✅ Proper field mapping (Title, Date, Location, Description, Ticket Link)

### 4. **Email System** ✓

- ✅ SendGrid integration
- ✅ HTML email template (lugers.html)
- ✅ Template hydration with show data
- ✅ Personalization with first name
- ✅ Email sending from show detail page
- ✅ Default recipient: poojavelu23@gmail.com
- ✅ Success/error feedback

### 5. **Deployment Configuration** ✓

- ✅ Vercel configuration for backend
- ✅ Vercel configuration for frontend
- ✅ Environment variables setup
- ✅ Production-ready settings
- ✅ CORS configured for cross-origin requests

### 6. **Documentation** ✓

- ✅ Comprehensive README.md
- ✅ Detailed deployment guide (DEPLOYMENT.md)
- ✅ API documentation (API_DOCUMENTATION.md)
- ✅ Airtable setup guide (AIRTABLE_SETUP.md)
- ✅ Quick start script (setup.sh)
- ✅ Code comments and structure

---

## 📁 Project Structure

```
comedy-shows-app/
├── README.md                    # Main project documentation
├── DEPLOYMENT.md                # Step-by-step deployment guide
├── API_DOCUMENTATION.md         # Complete API reference
├── AIRTABLE_SETUP.md           # Airtable configuration guide
├── setup.sh                     # Quick start script
├── .gitignore                   # Git ignore rules
│
├── backend/                     # Django backend
│   ├── comedy_shows/           # Django project
│   │   ├── settings.py         # Django settings with Airtable/SendGrid config
│   │   ├── urls.py             # Main URL routing
│   │   ├── wsgi.py             # WSGI application
│   │   └── asgi.py             # ASGI application
│   │
│   ├── shows/                   # Shows Django app
│   │   ├── views.py            # API endpoints (CRUD + Email)
│   │   ├── urls.py             # App URL routing
│   │   ├── airtable_service.py # Airtable integration service
│   │   ├── email_service.py    # SendGrid email service
│   │   ├── tests.py            # Unit tests
│   │   ├── models.py           # (Empty - using Airtable)
│   │   └── apps.py             # App configuration
│   │
│   ├── templates/
│   │   └── email_template.html # Email HTML template
│   │
│   ├── requirements.txt         # Python dependencies
│   ├── manage.py               # Django management script
│   ├── vercel.json             # Vercel deployment config
│   ├── .env                    # Environment variables
│   ├── .env.example            # Environment variables template
│   └── .gitignore              # Backend ignore rules
│
└── frontend/                    # React frontend
    ├── public/
    │   ├── index.html          # HTML template
    │   └── manifest.json       # PWA manifest
    │
    ├── src/
    │   ├── components/
    │   │   ├── ShowsList.js    # Show listings with filters
    │   │   └── ShowDetail.js   # Show details with email button
    │   │
    │   ├── api/
    │   │   └── shows.js        # API client (Axios)
    │   │
    │   ├── App.js              # Main app component with routing
    │   ├── App.css             # Styling
    │   ├── index.js            # React entry point
    │   └── index.css           # Global styles
    │
    ├── package.json             # Node dependencies
    ├── vercel.json             # Vercel deployment config
    ├── .env                    # Frontend environment variables
    ├── .env.example            # Environment template
    └── .gitignore              # Frontend ignore rules
```

---

## 🔧 Technical Stack

| Layer              | Technology            | Version | Purpose                            |
| ------------------ | --------------------- | ------- | ---------------------------------- |
| Frontend Framework | React                 | 18.2.0  | UI components and state management |
| Frontend Routing   | React Router DOM      | 6.20.0  | Client-side routing                |
| HTTP Client        | Axios                 | 1.6.2   | API communication                  |
| Backend Framework  | Django                | 4.2.7   | Web framework                      |
| API Framework      | Django REST Framework | 3.14.0  | RESTful API                        |
| CORS               | django-cors-headers   | 4.3.1   | Cross-origin requests              |
| Database/NoCode    | Airtable              | API v0  | Data storage and management        |
| Airtable Client    | pyairtable            | 2.1.0   | Python Airtable SDK                |
| Email Service      | SendGrid              | 6.10.0  | Email delivery                     |
| Environment        | python-dotenv         | 1.0.0   | Environment variable management    |
| Deployment         | Vercel                | Latest  | Hosting (frontend & backend)       |

---

## 🔑 Environment Variables

### Backend (.env)

```
AIRTABLE_TOKEN=your_airtable_token_here
AIRTABLE_BASE_ID=your_airtable_base_id_here
AIRTABLE_TABLE_NAME=Shows
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=admin@comedyuo.com
SECRET_KEY=your-django-secret-key
DEBUG=True  # Set to False in production
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:8000/api  # Update for production
```

---

## 🚀 Quick Start

### Using Setup Script (Recommended)

```bash
cd comedy-shows-app
./setup.sh
```

### Manual Setup

#### Backend:

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

#### Frontend:

```bash
cd frontend
npm install
npm start
```

---

## 📊 Data Flow

```
User Browser (React)
    ↓ HTTP Request
Frontend (localhost:3000)
    ↓ Axios API Call
Django Backend (localhost:8000/api)
    ↓ pyairtable SDK
Airtable Database
    ↑ Response
Django Backend
    ↓ JSON Response
Frontend
    ↓ Render
User Browser

Email Flow:
User clicks "Send Email"
    → Frontend POST /api/send-email/
    → Backend fetches show from Airtable
    → Backend hydrates email template
    → SendGrid API sends email
    → User sees success message
```

---

## 🎯 API Endpoints Summary

| Method | Endpoint         | Description                                     |
| ------ | ---------------- | ----------------------------------------------- |
| GET    | /api/shows/      | List all shows (supports ?filter=upcoming/past) |
| POST   | /api/shows/      | Create a new show                               |
| GET    | /api/shows/{id}/ | Get show details                                |
| PUT    | /api/shows/{id}/ | Update a show                                   |
| DELETE | /api/shows/{id}/ | Delete a show                                   |
| POST   | /api/send-email/ | Send email to guest                             |

---

## 🗃️ Airtable Schema

**Base ID**: `app5bkK7di2irGD5m`  
**Table**: `Shows`

| Field Name  | Type             | Required | Description              |
| ----------- | ---------------- | -------- | ------------------------ |
| Title       | Single line text | Yes      | Show name                |
| Date        | Date             | Yes      | Show date (YYYY-MM-DD)   |
| Location    | Single line text | Yes      | Venue location           |
| Description | Long text        | No       | Show description         |
| Ticket Link | URL              | No       | Link to purchase tickets |

---

## 📧 Email Template

- **Template File**: `backend/templates/email_template.html`
- **Source**: lugers.html (provided)
- **Personalization**: `{{first_name}}` placeholder
- **Styling**: Inline CSS for email compatibility
- **Images**: Hosted on S3
- **Features**: Responsive design, branded colors

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy backend (set root: `backend`)
4. Deploy frontend (set root: `frontend`)
5. Configure environment variables
6. Both apps auto-deploy on push

See **DEPLOYMENT.md** for detailed instructions.

---

## ✅ Testing

### Backend Tests

```bash
cd backend
python manage.py test
```

### Manual Testing Checklist

- [ ] Shows load from Airtable
- [ ] Filters work (All/Upcoming/Past)
- [ ] Show details page loads
- [ ] Email sends successfully
- [ ] CRUD operations work
- [ ] Responsive design works on mobile

---

## 🔐 Security Considerations

- ✅ Environment variables for sensitive data
- ✅ CORS configured
- ✅ No hardcoded credentials
- ✅ .gitignore includes .env files
- ⚠️ TODO: Add API authentication for production
- ⚠️ TODO: Rate limiting for email endpoint

---

## 🎨 Design Features

- **Color Scheme**: Navy blue (#1a307a) primary
- **Typography**: System fonts for fast loading
- **Layout**: Grid-based responsive design
- **Components**: Card-based UI
- **Interactions**: Hover effects, transitions
- **Accessibility**: Semantic HTML

---

## 📈 Future Enhancements

Potential features to add:

- [ ] User authentication
- [ ] Admin dashboard
- [ ] Multiple email recipients
- [ ] Email scheduling
- [ ] Show image uploads
- [ ] Calendar view
- [ ] Ticket inventory management
- [ ] Payment integration
- [ ] Social media sharing
- [ ] Analytics dashboard

---

## 🐛 Known Issues

None at the moment. Report issues to: poojavelu23@gmail.com

---

## 📞 Support

For questions or issues:

- Email: poojavelu23@gmail.com
- Documentation: See README.md and other .md files
- API Reference: API_DOCUMENTATION.md

---

## 📝 License

This project is for demonstration purposes.

---

## 🙏 Acknowledgments

- Airtable for no-code database solution
- SendGrid for email delivery
- Vercel for hosting
- React and Django communities

---

**Last Updated**: November 20, 2025  
**Version**: 1.0.0  
**Status**: ✅ Ready for Deployment
