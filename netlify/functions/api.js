const https = require('https');

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Shows';

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const path = event.path.replace('/.netlify/functions/api', '');
  const method = event.httpMethod;
  
  try {
    // GET /shows - List all shows
    if (path === '/shows' && method === 'GET') {
      const filter = event.queryStringParameters?.filter;
      const records = await getAirtableRecords();
      
      let shows = records.map(record => ({
        id: record.id,
        airtable_id: record.id,
        title: record.fields.title || '',
        date_time: record.fields.date_time || '',
        location: record.fields.location || '',
        description: record.fields.description || '',
        comedian: record.fields.comedian || '',
        ticket_price: record.fields.ticket_price || null,
        ticket_url: record.fields.ticket_url || ''
      }));

      // Filter by upcoming/past
      if (filter === 'upcoming') {
        const now = new Date();
        shows = shows.filter(show => new Date(show.date_time) >= now);
      } else if (filter === 'past') {
        const now = new Date();
        shows = shows.filter(show => new Date(show.date_time) < now);
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ results: shows })
      };
    }

    // GET /shows/:id - Get single show
    if (path.match(/^\/shows\/[^\/]+$/) && method === 'GET') {
      const id = path.split('/')[2];
      const record = await getAirtableRecord(id);
      
      const show = {
        id: record.id,
        airtable_id: record.id,
        title: record.fields.title || '',
        date_time: record.fields.date_time || '',
        location: record.fields.location || '',
        description: record.fields.description || '',
        comedian: record.fields.comedian || '',
        ticket_price: record.fields.ticket_price || null,
        ticket_url: record.fields.ticket_url || ''
      };

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(show)
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Not found' })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};

// Helper function to get Airtable records
function getAirtableRecords() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.airtable.com',
      path: `/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.records || []);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

// Helper function to get a single Airtable record
function getAirtableRecord(recordId) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.airtable.com',
      path: `/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}/${recordId}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}
