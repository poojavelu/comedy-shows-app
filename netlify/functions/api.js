const https = require("https");

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || "Shows";

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  // Extract path - handle both direct function calls and redirected paths
  let path = event.path;
  if (path.includes("/.netlify/functions/api")) {
    path = path.replace("/.netlify/functions/api", "");
  } else if (path.startsWith("/api")) {
    path = path.replace("/api", "");
  }

  const method = event.httpMethod;

  console.log("Path:", path, "Method:", method);

  try {
    // GET /shows - List all shows
    if ((path === "/shows" || path === "/shows/") && method === "GET") {
      const filter = event.queryStringParameters?.filter;
      const records = await getAirtableRecords();

      let shows = records.map((record) => ({
        id: record.id,
        airtable_id: record.id,
        title: record.fields.title || "",
        date_time: record.fields.date_time || "",
        location: record.fields.location || "",
        description: record.fields.description || "",
        comedian: record.fields.comedian || "",
        ticket_price: record.fields.ticket_price || null,
        ticket_url: record.fields.ticket_url || "",
      }));

      // Filter by upcoming/past
      if (filter === "upcoming") {
        const now = new Date();
        shows = shows.filter((show) => new Date(show.date_time) >= now);
      } else if (filter === "past") {
        const now = new Date();
        shows = shows.filter((show) => new Date(show.date_time) < now);
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ results: shows }),
      };
    }

    // GET /shows/:id - Get single show
    if (path.match(/^\/shows\/[^\/]+\/?$/) && method === "GET") {
      const pathParts = path.split("/").filter((p) => p);
      const id = pathParts[pathParts.length - 1];
      const record = await getAirtableRecord(id);

      const show = {
        id: record.id,
        airtable_id: record.id,
        title: record.fields.title || "",
        date_time: record.fields.date_time || "",
        location: record.fields.location || "",
        description: record.fields.description || "",
        comedian: record.fields.comedian || "",
        ticket_price: record.fields.ticket_price || null,
        ticket_url: record.fields.ticket_url || "",
      };

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(show),
      };
    }

    // POST /shows - Create a new show
    if ((path === "/shows" || path === "/shows/") && method === "POST") {
      const body = JSON.parse(event.body);
      const record = await createAirtableRecord(body);

      const show = {
        id: record.id,
        airtable_id: record.id,
        title: record.fields.title || "",
        date_time: record.fields.date_time || "",
        location: record.fields.location || "",
        description: record.fields.description || "",
        comedian: record.fields.comedian || "",
        ticket_price: record.fields.ticket_price || null,
        ticket_url: record.fields.ticket_url || "",
      };

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(show),
      };
    }

    // PUT /shows/:id - Update a show
    if (path.match(/^\/shows\/[^\/]+\/?$/) && method === "PUT") {
      const pathParts = path.split("/").filter((p) => p);
      const id = pathParts[pathParts.length - 1];
      const body = JSON.parse(event.body);
      const record = await updateAirtableRecord(id, body);

      const show = {
        id: record.id,
        airtable_id: record.id,
        title: record.fields.title || "",
        date_time: record.fields.date_time || "",
        location: record.fields.location || "",
        description: record.fields.description || "",
        comedian: record.fields.comedian || "",
        ticket_price: record.fields.ticket_price || null,
        ticket_url: record.fields.ticket_url || "",
      };

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(show),
      };
    }

    // DELETE /shows/:id - Delete a show
    if (path.match(/^\/shows\/[^\/]+\/?$/) && method === "DELETE") {
      const pathParts = path.split("/").filter((p) => p);
      const id = pathParts[pathParts.length - 1];
      await deleteAirtableRecord(id);

      return {
        statusCode: 204,
        headers,
        body: "",
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: "Not found" }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

// Helper function to get Airtable records
function getAirtableRecords() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.airtable.com",
      path: `/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
        AIRTABLE_TABLE_NAME
      )}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          resolve(json.records || []);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on("error", reject);
    req.end();
  });
}

// Helper function to create an Airtable record
function createAirtableRecord(data) {
  return new Promise((resolve, reject) => {
    const fields = {
      title: data.title,
      date_time: data.date_time,
      location: data.location,
      description: data.description,
    };

    if (data.comedian) fields.comedian = data.comedian;
    if (data.ticket_price) fields.ticket_price = parseFloat(data.ticket_price);
    if (data.ticket_url) fields.ticket_url = data.ticket_url;

    const postData = JSON.stringify({ fields });

    const options = {
      hostname: "api.airtable.com",
      path: `/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

// Helper function to update an Airtable record
function updateAirtableRecord(recordId, data) {
  return new Promise((resolve, reject) => {
    const fields = {};

    if (data.title !== undefined) fields.title = data.title;
    if (data.date_time !== undefined) fields.date_time = data.date_time;
    if (data.location !== undefined) fields.location = data.location;
    if (data.description !== undefined) fields.description = data.description;
    if (data.comedian !== undefined) fields.comedian = data.comedian;
    if (data.ticket_price !== undefined)
      fields.ticket_price = parseFloat(data.ticket_price);
    if (data.ticket_url !== undefined) fields.ticket_url = data.ticket_url;

    const postData = JSON.stringify({ fields });

    const options = {
      hostname: "api.airtable.com",
      path: `/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
        AIRTABLE_TABLE_NAME
      )}/${recordId}`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

// Helper function to delete an Airtable record
function deleteAirtableRecord(recordId) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.airtable.com",
      path: `/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
        AIRTABLE_TABLE_NAME
      )}/${recordId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on("error", reject);
    req.end();
  });
}
// Helper function to get a single Airtable record
function getAirtableRecord(recordId) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.airtable.com",
      path: `/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
        AIRTABLE_TABLE_NAME
      )}/${recordId}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on("error", reject);
    req.end();
  });
}
