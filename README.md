# Comedy Shows App

A React application for browsing and managing comedy shows with serverless backend, **Airtable** database, and **SendGrid** email integration.

## Features

### Original Requirements

- ✅ Display 3 upcoming comedy shows with title, date/time, location, and description
- ✅ Show details page for each comedy show
- ✅ Filters for "Upcoming" vs "Past" shows
- ✅ Python API endpoints for CRUD operations on shows
- ✅ Email functionality to send invitations to guests via button click
- ✅ Airtable form integration for show tickets

### Additional Features

- 🎪 **Hero Carousel** - Auto-activates when > 6 shows
- 🔐 **Admin Panel** - Full CRUD operations at `/manage-shows`
- 📧 **Email Invitations** - Personalized emails with show details via SendGrid
- 🎨 **Clean UI** - White theme with outlined buttons

### Tech Stack

- **Frontend:** React 18 + Vite
- **Backend:** Netlify Serverless Functions (Node.js)
- **Database:** Airtable
- **Email Service:** SendGrid
- **Deployment:** Netlify

> **Note:** Other Navigation links in the header are placeholders and not yet configured. They may be implemented in future updates.

## Running the App Locally

### Prerequisites

- Node.js 18+
- Airtable account with API key
- SendGrid account with API key

### Setup

1. **Clone and install dependencies:**

   ```bash
   git clone <your-repo-url>
   cd comedy-shows-app
   npm install
   npm install -g netlify-cli
   ```

2. **Create `.env` file** in root directory:

   ```env
   AIRTABLE_API_KEY=your_airtable_personal_access_token
   AIRTABLE_BASE_ID=your_airtable_base_id
   AIRTABLE_TABLE_NAME=Shows
   SENDGRID_API_KEY=your_sendgrid_api_key
   ```

3. **Run the application** (requires 2 terminals):

   **Terminal 1 - Frontend:**

   ```bash
   npm run dev
   ```

   **Terminal 2 - Backend Functions:**

   ```bash
   netlify functions:serve --port 9999
   ```
