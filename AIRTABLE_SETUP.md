# Comedy Shows App - No-Code Tool Configuration

## Airtable Configuration

This application uses Airtable as a no-code tool to manage show data.

### Setup

1. **Airtable Base**: `app5bkK7di2irGD5m`
2. **Table Name**: `Shows`
3. **API Token**: Configured in environment variables

### Table Structure

The Airtable `Shows` table should have the following fields:

- **Title** (Single line text) - Name of the comedy show
- **Date** (Date) - Date of the show in YYYY-MM-DD format
- **Location** (Single line text) - Venue location
- **Description** (Long text) - Description of the show
- **Ticket Link** (URL) - Link to purchase tickets

### Sample Data

Here are 3 sample shows you can add to your Airtable:

| Title                      | Date       | Location               | Description                                                  | Ticket Link                            |
| -------------------------- | ---------- | ---------------------- | ------------------------------------------------------------ | -------------------------------------- |
| Comedy Night at The Cellar | 2025-11-30 | The Comedy Cellar, NYC | Experience world-class comedy at NYC's most iconic venue     | https://airtable.com/app5bkK7di2irGD5m |
| Stand-Up Spectacular       | 2025-11-28 | Madison Square Garden  | The biggest comedy event of the year featuring top comedians | https://airtable.com/app5bkK7di2irGD5m |
| Laugh Factory Weekend      | 2025-12-05 | Laugh Factory, NY      | Weekend comedy special with surprise guests                  | https://airtable.com/app5bkK7di2irGD5m |

### Accessing Your Airtable

1. Go to [airtable.com](https://airtable.com)
2. Sign in with your account
3. Navigate to base: `app5bkK7di2irGD5m`
4. Open the `Shows` table
5. Add, edit, or delete shows directly in Airtable
6. Changes will automatically reflect in your React app!

### Benefits of Using Airtable

- ✅ No-code interface for managing show data
- ✅ Easy to add, edit, or remove shows
- ✅ Shareable with team members
- ✅ Built-in data validation
- ✅ API automatically generated
- ✅ Can create forms for show submissions
- ✅ Can add more fields as needed

### Adding Shows via Airtable Interface

You can create a form in Airtable to allow submissions:

1. In your Airtable base, click "Form" view
2. Customize the form fields
3. Share the form link with your team or customers
4. Submissions automatically create new records

### API Integration

The Django backend connects to Airtable using:

- **pyairtable** library
- Environment variables for secure token storage
- Automatic synchronization with the React frontend
