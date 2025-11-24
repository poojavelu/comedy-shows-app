const https = require("https");

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@comedyshows.com";

function getEmailTemplate(showData, guestData) {
  const firstName = guestData.first_name || "Guest";
  const showTitle = showData.title || "Comedy Show";
  const showDate = showData.date_time
    ? new Date(showData.date_time).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Date TBA";
  const showTime = showData.date_time
    ? new Date(showData.date_time).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })
    : "Time TBA";
  const location = showData.location || "Venue TBA";
  const description = showData.description || "";
  const ticketUrl =
    showData.ticket_url ||
    "https://airtable.com/app5bkK7di2irGD5m/pagEAH81NKH42MCuS/form";

  return `
<!DOCTYPE html>
<html>
<body style="
    font-family: Inter, Arial;
    background-color: #feffff !important;
    padding: 0;
    margin: 0;
  ">
  <div>
    <div dir="ltr" style="
        margin: 0px;
        width: 100%;
        padding: 0px;
        font-family: arial, sans-serif;
        color: #444a5b !important;
      ">
      <table style="
          margin-left: auto;
          margin-right: auto;
          margin-top: 0px;
          margin-bottom: 0px;
          width: 100%;
          border-collapse: collapse;
          padding: 0px;
        ">
        <tr>
          <th>
            <span style="justify-content: center">
              <div style="text-align: center">
                <img style="height: 175px; margin-top: 40px"
                  src="https://cuo-email-photos.s3.us-east-1.amazonaws.com/cuo-white-logo.png" />
              </div>
            </span>
          </th>
        </tr>
      </table>
      <table role="presentation" valign="top" border="0" cellspacing="0" cellpadding="20" align="center" style="
          border-collapse: collapse;
          margin-left: auto;
          margin-right: auto;
          margin-top: 0px;
          margin-bottom: 0px;
          width: 600px;
          max-width: 600px;
          padding: 0px;
          font-size: 14px;
          color: #444a5b !important;
        ">
        <tr>
          <td style="padding: 8px" align="center">
            <p style="
                font-size: 25px;
                margin: 0px;
                line-height: 35px;
                padding-top: 30px;
                color: #1a307a;
              ">
              <strong> ${showTitle} </strong>
            </p>
            <p style="
                font-size: 22px;
                margin: 0px;
                margin-top: 20px;
                margin-bottom: 10px;

                color: #1a307a;
              ">
              ${showDate}
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px" align="center">
            <img src="https://cuo-email-photos.s3.us-east-1.amazonaws.com/lugerscuo.png" style="
                height: 350px;
                object-fit: contain;
                border-radius: 5px;
                margin-top: 8px;
              " />
          </td>
        </tr>
        <tr>
          <td style="padding: 8px">
            <div style="line-height: 28px">
              <div style="text-align: center">
                <p style="font-size: 18px; color: #1a307a">
                  <strong>Hi ${firstName}! </strong>
                </p>

                <p style="font-size: 18px; margin: 0px">
                  You're invited to ${showTitle}
                  <br />@ <br />
                  <b>${location}</b>
                </p>
              </div>
              <div>
                <p style="text-align: center; font-size: 18px">
                  ${description ? description + "<br /><br />" : ""}
                  <strong>Event Details:</strong><br />
                  ${showDate}<br />
                  Show time: ${showTime}<br />
                  <br />
                  All drinks and food are included in the ticket! Luger Burger +
                  fries will be served after the show!
                  <br /><br />
                </p>
              </div>
              <div style="text-align: center; padding: 30px">
                <a href="${ticketUrl}" target="_blank" style="
                    font-size: 16px;
                    padding: 15px;
                    border: none;
                    cursor: pointer;
                    color: white;
                    background-color: #1a307a;
                    border-radius: 5px;
                    text-decoration: none;
                  ">
                  GET YOUR TICKETS HERE
                </a>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div style="line-height: 22px">
              <div style="text-align: center">
                <p style="font-size: 16px">All lineups are a surprise!</p>
              </div>
            </div>
            <div style="text-align: center">
              <p style="font-size: 16px">
                If you have questions, feel free to DM us @comedy.uo on
                Instagram. Hope to see you there!
              </p>
              <p style="font-size: 16px">
                If you can't make it join the
                <a href="https://app.comedyuo.com/waitlist"> waitlist </a> to
                get the latest on our upcoming shows ❤️
              </p>
              <div style="padding: 10px">
                <a href="https://app.comedyuo.com/waitlist" target="_blank" style="
                    font-size: 16px;
                    cursor: pointer;
                    padding: 5px 10px;
                    border: 1px solid #1a307a;
                    color: #1a307a;
                    background-color: white;
                    border-radius: 3px;
                    text-decoration: none;
                  ">
                  JOIN THE WAITLIST
                </a>
              </div>
            </div>
            <div style="line-height: 22px">
              <div style="text-align: center; font-style: italic">
                <p>—</p>
              </div>
              <div style="text-align: center; font-style: italic">
                <p>
                  An important note on timing: doors open time for the show is
                  30 minutes prior to showtime. Come early to enjoy food &
                  drinks.
                </p>
              </div>
              <div style="text-align: center; font-style: italic">
                <p>
                  While we encourage you to take pictures and videos of the
                  space, filming the comics is strictly prohibited.
                </p>
              </div>
              <div style="text-align: center; font-style: italic">
                <p>
                  This is a 21+ event - security will be checking tickets and
                  ID's.
                </p>
              </div>
              <div style="text-align: center; font-style: italic">
                <p>
                  If you have any questions, please reach out to us via
                  Instagram @comedy.uo or email us at admin@comedyuo.com
                </p>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</body>
</html>
  `;
}

function sendEmailViaSendGrid(toEmail, subject, htmlContent) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      personalizations: [
        {
          to: [{ email: toEmail }],
          subject: subject,
        },
      ],
      from: { email: FROM_EMAIL },
      content: [
        {
          type: "text/html",
          value: htmlContent,
        },
      ],
    });

    const options = {
      hostname: "api.sendgrid.com",
      path: "/v3/mail/send",
      method: "POST",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
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
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ success: true, statusCode: res.statusCode });
        } else {
          reject({
            success: false,
            statusCode: res.statusCode,
            message: data,
          });
        }
      });
    });

    req.on("error", (error) => {
      reject({ success: false, error: error.message });
    });

    req.write(postData);
    req.end();
  });
}

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { to_email, show_data, guest_data } = body;

    if (!to_email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "to_email is required" }),
      };
    }

    if (!SENDGRID_API_KEY) {
      console.error("SENDGRID_API_KEY not configured");
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: "Email service not configured",
        }),
      };
    }

    const emailHtml = getEmailTemplate(show_data || {}, guest_data || {});
    const subject = `${show_data?.title || "Comedy Show"} - You're Invited!`;

    await sendEmailViaSendGrid(to_email, subject, emailHtml);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: `Email sent successfully to ${to_email}`,
      }),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Failed to send email",
        details: error.message,
      }),
    };
  }
};
