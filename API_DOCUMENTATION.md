# Comedy Shows App - API Documentation

## Base URL

- Development: `http://localhost:8000/api`
- Production: `https://your-backend.vercel.app/api`

---

## 📋 Shows Endpoints

### 1. Get All Shows

**Endpoint:** `GET /shows/`

**Description:** Retrieve all comedy shows from Airtable

**Query Parameters:**

- `filter` (optional): Filter shows by time period
  - `upcoming`: Shows with date >= today
  - `past`: Shows with date < today
  - Omit for all shows

**Request Example:**

```bash
# Get all shows
curl http://localhost:8000/api/shows/

# Get upcoming shows
curl http://localhost:8000/api/shows/?filter=upcoming

# Get past shows
curl http://localhost:8000/api/shows/?filter=past
```

**Response Example:**

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": "recABC123",
      "title": "Comedy Night at The Cellar",
      "date": "2025-11-30",
      "location": "The Comedy Cellar, NYC",
      "description": "Experience world-class comedy",
      "ticket_link": "https://airtable.com/app5bkK7di2irGD5m",
      "created_time": "2025-11-20T10:00:00.000Z"
    }
  ]
}
```

---

### 2. Get Single Show

**Endpoint:** `GET /shows/{record_id}/`

**Description:** Retrieve details of a specific show

**Path Parameters:**

- `record_id`: Airtable record ID (e.g., "recABC123")

**Request Example:**

```bash
curl http://localhost:8000/api/shows/recABC123/
```

**Response Example:**

```json
{
  "success": true,
  "data": {
    "id": "recABC123",
    "title": "Comedy Night at The Cellar",
    "date": "2025-11-30",
    "location": "The Comedy Cellar, NYC",
    "description": "Experience world-class comedy",
    "ticket_link": "https://airtable.com/app5bkK7di2irGD5m",
    "created_time": "2025-11-20T10:00:00.000Z"
  }
}
```

---

### 3. Create Show

**Endpoint:** `POST /shows/`

**Description:** Create a new comedy show in Airtable

**Request Body:**

```json
{
  "title": "Comedy Night at The Cellar",
  "date": "2025-11-30",
  "location": "The Comedy Cellar, NYC",
  "description": "Experience world-class comedy",
  "ticket_link": "https://example.com/tickets"
}
```

**Required Fields:**

- `title` (string)
- `date` (string, format: YYYY-MM-DD)
- `location` (string)

**Optional Fields:**

- `description` (string)
- `ticket_link` (string, URL)

**Request Example:**

```bash
curl -X POST http://localhost:8000/api/shows/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Comedy Night",
    "date": "2025-12-01",
    "location": "Comedy Club, NYC",
    "description": "Great comedy show",
    "ticket_link": "https://example.com"
  }'
```

**Response Example:**

```json
{
  "success": true,
  "data": {
    "id": "recNEW123",
    "title": "Comedy Night",
    "date": "2025-12-01",
    "location": "Comedy Club, NYC",
    "description": "Great comedy show",
    "ticket_link": "https://example.com",
    "created_time": "2025-11-20T15:30:00.000Z"
  }
}
```

---

### 4. Update Show

**Endpoint:** `PUT /shows/{record_id}/`

**Description:** Update an existing show

**Path Parameters:**

- `record_id`: Airtable record ID

**Request Body:** (all fields optional)

```json
{
  "title": "Updated Title",
  "date": "2025-12-15",
  "location": "New Venue",
  "description": "Updated description",
  "ticket_link": "https://new-link.com"
}
```

**Request Example:**

```bash
curl -X PUT http://localhost:8000/api/shows/recABC123/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Comedy Night",
    "description": "New description"
  }'
```

**Response Example:**

```json
{
  "success": true,
  "data": {
    "id": "recABC123",
    "title": "Updated Comedy Night",
    "date": "2025-11-30",
    "location": "The Comedy Cellar, NYC",
    "description": "New description",
    "ticket_link": "https://airtable.com/app5bkK7di2irGD5m",
    "created_time": "2025-11-20T10:00:00.000Z"
  }
}
```

---

### 5. Delete Show

**Endpoint:** `DELETE /shows/{record_id}/`

**Description:** Delete a show from Airtable

**Path Parameters:**

- `record_id`: Airtable record ID

**Request Example:**

```bash
curl -X DELETE http://localhost:8000/api/shows/recABC123/
```

**Response Example:**

```json
{
  "success": true,
  "message": "Show deleted successfully"
}
```

---

## 📧 Email Endpoint

### Send Email

**Endpoint:** `POST /send-email/`

**Description:** Send a personalized email invite to a guest

**Request Body:**

```json
{
  "email": "poojavelu23@gmail.com",
  "first_name": "Pooja",
  "show_id": "recABC123"
}
```

**OR with direct show data:**

```json
{
  "email": "guest@example.com",
  "first_name": "Guest",
  "title": "Comedy Night",
  "date": "2025-12-01",
  "location": "Comedy Club",
  "description": "Amazing show",
  "ticket_link": "https://example.com"
}
```

**Fields:**

- `email` (string): Recipient email (defaults to poojavelu23@gmail.com)
- `first_name` (string): Recipient's first name for personalization
- `show_id` (string, optional): Airtable record ID to fetch show data
- OR provide show details directly (title, date, location, etc.)

**Request Example:**

```bash
curl -X POST http://localhost:8000/api/send-email/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "poojavelu23@gmail.com",
    "first_name": "Pooja",
    "show_id": "recABC123"
  }'
```

**Response Example:**

```json
{
  "success": true,
  "data": {
    "status": "success",
    "status_code": 202,
    "message": "Email sent to poojavelu23@gmail.com"
  }
}
```

---

## 🚨 Error Responses

All endpoints return error responses in the following format:

**Example Error Response:**

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

**Common HTTP Status Codes:**

- `200 OK`: Successful GET, PUT, DELETE
- `201 Created`: Successful POST
- `400 Bad Request`: Missing required fields or invalid data
- `404 Not Found`: Show with given ID not found
- `500 Internal Server Error`: Server-side error (Airtable, SendGrid, etc.)

---

## 🔐 Authentication

Currently, the API does not require authentication. For production use, consider implementing:

- API keys
- JWT tokens
- OAuth

---

## 📊 Rate Limits

The API inherits rate limits from:

- **Airtable API**: 5 requests per second per base
- **SendGrid API**: Depends on your plan (Free: 100 emails/day)

---

## 🧪 Testing with Postman

Import this collection to test all endpoints:

1. Create a new collection in Postman
2. Add requests for each endpoint above
3. Set base URL as an environment variable
4. Test CRUD operations and email sending

---

## 📝 Notes

- All dates should be in `YYYY-MM-DD` format
- Airtable record IDs start with "rec" followed by alphanumeric characters
- Email template is hydrated with show data automatically
- The API is stateless - no sessions required

---

## 🔗 Related Documentation

- [Airtable Setup](../AIRTABLE_SETUP.md)
- [Deployment Guide](../DEPLOYMENT.md)
- [Main README](../README.md)
