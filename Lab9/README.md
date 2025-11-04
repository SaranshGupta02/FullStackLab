# Lab 9 - Node.js HTTP Server with Logging

A simple HTTP server built with Node.js that demonstrates routing, request handling, and comprehensive logging functionality.

## Features

✅ **Three Routes:**
- `/` - Welcome message
- `/about` - Application information
- `/contact` - Contact email information

✅ **Comprehensive Request Logging:**
- Exact timestamp when request was received
- HTTP method (GET, POST, PUT, DELETE, etc.)
- URL and endpoint being requested
- Important headers (Authorization, User-Agent, Content-Type, etc.)
- Query parameters
- Request body (for POST/PUT/PATCH requests)
- Client IP address
- Response status code
- Response time in milliseconds

✅ **All logs are saved to `log.txt` file**

## Prerequisites

- Node.js (version 14.0.0 or higher)
- npm (comes with Node.js)

## Installation

1. Navigate to the Lab9 directory:
```bash
cd Lab9
```

2. Install dependencies (this project uses only built-in Node.js modules, so no installation needed):
```bash
# No npm install required - uses only Node.js built-in modules
```

## Running the Server

Start the server using:
```bash
node server.js
```

Or using npm:
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### 1. Home Route - `/`
**Method:** GET  
**Response:**
```json
{
  "message": "Welcome to the Node.js HTTP Server!",
  "description": "This is the home page of the application."
}
```

### 2. About Route - `/about`
**Method:** GET  
**Response:**
```json
{
  "message": "About the Application",
  "description": "This is a simple HTTP server built with Node.js.",
  "version": "1.0.0",
  "author": "Lab 9 Assignment",
  "features": [
    "RESTful API endpoints",
    "Comprehensive request logging",
    "Error handling",
    "Query parameter support",
    "Request body parsing"
  ]
}
```

### 3. Contact Route - `/contact`
**Method:** GET  
**Response:**
```json
{
  "message": "Contact Information",
  "email": "contact@example.com",
  "description": "Feel free to reach out to us for any inquiries."
}
```

## Testing the Server

### Using Browser
Simply visit:
- http://localhost:3000
- http://localhost:3000/about
- http://localhost:3000/contact

### Using cURL

**Home route:**
```bash
curl http://localhost:3000/
```

**About route:**
```bash
curl http://localhost:3000/about
```

**Contact route:**
```bash
curl http://localhost:3000/contact
```

**With query parameters:**
```bash
curl "http://localhost:3000/?name=John&age=25"
```

**POST request with body:**
```bash
curl -X POST http://localhost:3000/ \
  -H "Content-Type: application/json" \
  -d '{"name":"John","message":"Hello"}'
```

### Using Postman
1. Import the endpoints
2. Test with different HTTP methods (GET, POST, PUT, DELETE)
3. Add query parameters
4. Add request body for POST/PUT requests
5. Check the `log.txt` file for logged requests

## Log File

All requests are automatically logged to `log.txt` in the same directory. The log file contains:

- **Timestamp**: Exact time when request was received (ISO format)
- **Method**: HTTP method used (GET, POST, PUT, DELETE, etc.)
- **URL**: Full URL with query parameters
- **Endpoint**: The specific route path
- **Client IP Address**: IP address of the client making the request
- **Headers**: Important headers including:
  - User-Agent
  - Authorization (masked for security)
  - Content-Type
  - Accept
  - Host
- **Query Parameters**: All query string parameters
- **Request Body**: Body content for POST/PUT/PATCH requests
- **Response Status Code**: HTTP status code (200, 404, etc.)
- **Response Time**: Time taken to process the request in milliseconds

### Sample Log Entry

```
═══════════════════════════════════════════════════════════════
REQUEST RECEIVED
═══════════════════════════════════════════════════════════════
Timestamp          : 2025-11-04T23:30:45.123Z
Method             : GET
URL                : /about?version=1.0
Endpoint           : /about
Client IP Address  : ::1

HEADERS:
───────────────────────────────────────────────────────────────
User-Agent         : Mozilla/5.0 (Windows NT 10.0; Win64; x64)...
Authorization      : N/A
Content-Type       : N/A
Accept             : text/html,application/json
Host               : localhost:3000

QUERY PARAMETERS:
───────────────────────────────────────────────────────────────
{
  "version": "1.0"
}

REQUEST BODY:
───────────────────────────────────────────────────────────────
N/A (GET/DELETE request)

RESPONSE:
───────────────────────────────────────────────────────────────
Status Code        : 200
Response Time      : 5ms
═══════════════════════════════════════════════════════════════
```

## Project Structure

```
Lab9/
├── server.js      # Main server file
├── package.json   # Project configuration
├── README.md      # This file
└── log.txt        # Generated log file (created automatically)
```

## Implementation Details

### Technologies Used
- **Node.js** - JavaScript runtime
- **Built-in HTTP Module** - For creating the server
- **File System (fs)** - For writing logs
- **URL Module** - For parsing URLs and query parameters

### Key Features

1. **Async Request Body Parsing**: Handles request bodies asynchronously for POST/PUT/PATCH requests
2. **IP Address Detection**: Supports various methods to detect client IP (including proxy headers)
3. **Comprehensive Logging**: Logs all required information in a formatted, readable way
4. **Error Handling**: Graceful error handling for server errors and port conflicts
5. **404 Handling**: Returns proper 404 responses for unknown routes

## Stopping the Server

Press `CTRL+C` in the terminal to stop the server gracefully.

## Notes

- The log file (`log.txt`) is created automatically when the first request is received
- Logs are appended to the file, so previous logs are preserved
- The server runs on port 3000 by default
- All routes return JSON responses
- Query parameters are automatically parsed and logged
- Request bodies are only captured for POST, PUT, and PATCH methods

## Assignment Requirements Checklist

✅ Create a simple HTTP server in Node.js  
✅ Add three routes: `/`, `/about`, `/contact`  
✅ `/` returns a welcome message  
✅ `/about` returns information about the application  
✅ `/contact` returns a contact email  
✅ Log exact time when request was received  
✅ Log method used in the request  
✅ Log URL/endpoint being requested  
✅ Log important headers (Authorization, User-Agent, Content-Type)  
✅ Log query parameters  
✅ Log request body (for POST/PUT requests)  
✅ Log client IP address  
✅ Log response status code  
✅ Log response time  
✅ All logs maintained in `log.txt` file  
