URL Shortener Microservice
This is a lightweight, in-memory URL shortener microservice built with Node.js and Express. It allows users to create short links for long URLs, track click statistics, and set custom expiry times. All data is stored in-memory and will be reset when the server restarts.

Pre-requisites
Node.js (v18.0 or newer recommended for native fetch support)

npm (usually included with Node.js)

Installation & Running
Clone the repository or download the source code.

Navigate to the project directory:

cd backend

Install dependencies:

npm install

Start the server:

npm start

The server will start on http://localhost:3000 by default.

API Endpoints

1. Create a Short URL
   This endpoint creates a new short link for a given URL. You can optionally provide a custom shortcode and a validity period.

Method: POST

Path: /shorturls

Request Body (JSON)
Field

Type

Required

Default

Description

url

string

Yes

The original, long URL you want to shorten.

validity

number

No

30

The link's validity period in minutes.

shortcode

string

No

random

A custom 5-character code for your link.

Example Request:
{
"url": "[https://expressjs.com/en/starter/hello-world.html](https://expressjs.com/en/starter/hello-world.html)",
"validity": 60,
"shortcode": "express-hw"
}

Example Success Response (201 Created):
{
"shortlink": "http://localhost:3000/express-hw",
"expiry": "2025-09-18T08:00:00.123Z"
}

2. Redirect to Original URL
   This endpoint is the core function of the service. Accessing the short link will redirect the user to the original long URL and log the click.

Method: GET

Path: /:shortcode

Example Usage:
Simply open the generated short link in your web browser.

URL: http://localhost:3000/express-hw

Expected Behavior:
The browser will be redirected to https://expressjs.com/en/starter/hello-world.html. If the link is expired or does not exist, an appropriate JSON error will be returned.

3. Get URL Statistics
   This endpoint retrieves the usage statistics for a specific short link, including the total number of clicks and details about each click.

Method: GET

Path: /shorturls/:shortcode

Example Request:
URL: http://localhost:3000/shorturls/express-hw

Example Success Response (200 OK):
{
"totalClicks": 1,
"originalUrl": "[https://expressjs.com/en/starter/hello-world.html](https://expressjs.com/en/starter/hello-world.html)",
"creationDate": "2025-09-18T07:00:00.123Z",
"expiryDate": "2025-09-18T08:00:00.123Z",
"clickDetails": [
{
"timestamp": "2025-09-18T07:05:10.456Z",
"source": "direct",
"location": "::1"
}
]
}
