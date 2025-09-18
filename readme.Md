# URL Shortener Microservice

A simple URL shortener microservice built with Node.js and Express. It allows creating short URLs for long URLs, redirecting to the original URLs, and retrieving click statistics. Data is stored in-memory and resets on server restart.

## Requirements

- Node.js (version 14 or higher)
- npm

## Installation and Running

1. Clone the repository or download the source code.
2. Navigate to the project directory:
   ```
   cd backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   npm start
   ```
   The server will run on http://localhost:3000 by default.

## API Endpoints

### Create Short URL

- **Method**: POST
- **Path**: /create
- **Request Body** (JSON):
  | Field | Type | Required | Default | Description |
  |-----------|--------|----------|---------|--------------------------------------|
  | url | string | Yes | | The original URL to shorten |
  | validity | number | No | 30 | Validity period in minutes |
  | shortcode | string | No | random | Custom shortcode (if provided) |

- **Example Request**:

  ```json
  {
    "url": "https://example.com",
    "validity": 60,
    "shortcode": "abc123"
  }
  ```

- **Example Response** (200 OK):
  ```json
  {
    "shortlink": "http://localhost:3000/abc123",
    "expiry": "2023-10-01T12:00:00.000Z"
  }
  ```

### Redirect to Original URL

- **Method**: GET
- **Path**: /:shortcode
- **Request Body**: None

- **Example Request**:

  ```
  GET http://localhost:3000/abc123
  ```

- **Example Response**: Redirects to the original URL (302 status) or error JSON if not found/expired.

### Get Stats

- **Method**: GET
- **Path**: /shorturl/:shortcode
- **Request Body**: None

- **Example Request**:

  ```
  GET http://localhost:3000/shorturl/abc123
  ```

- **Example Response** (200 OK):
  ```json
  {
    "totalclicks": 5,
    "orinalUrl": "https://example.com",
    "creationDate": "2023-10-01T11:00:00.000Z",
    "expiryDate": "2023-10-01T12:00:00.000Z",
    "clicksDetails": [
      {
        "timestamp": "2023-10-01T11:30:00.000Z",
        "source": "direct",
        "location": "127.0.0.1"
      }
    ]
  }
  ```
