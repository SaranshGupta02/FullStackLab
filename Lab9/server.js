const http = require('http');
const fs = require('fs');
const url = require('url');

// Port configuration
const PORT = 3000;

// Helper function to get client IP address
const getClientIP = (req) => {
  return req.headers['x-forwarded-for']?.split(',')[0] || 
         req.headers['x-real-ip'] || 
         req.socket.remoteAddress || 
         'Unknown';
};

// Helper function to get request body
const getRequestBody = (req) => {
  return new Promise((resolve) => {
    let body = '';
    
    // Only collect body for POST/PUT requests
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
      req.on('data', chunk => {
        body += chunk.toString();
      });
      
      req.on('end', () => {
        resolve(body || 'No body provided');
      });
    } else {
      resolve('N/A (GET/DELETE request)');
    }
  });
};

// Helper function to format log entry
const formatLogEntry = (logData) => {
  return `
═══════════════════════════════════════════════════════════════
REQUEST RECEIVED
═══════════════════════════════════════════════════════════════
Timestamp          : ${logData.timestamp}
Method             : ${logData.method}
URL                : ${logData.url}
Endpoint           : ${logData.endpoint}
Client IP Address  : ${logData.clientIP}

HEADERS:
───────────────────────────────────────────────────────────────
User-Agent         : ${logData.headers['user-agent'] || 'N/A'}
Authorization      : ${logData.headers['authorization'] ? '***' : 'N/A'}
Content-Type       : ${logData.headers['content-type'] || 'N/A'}
Accept             : ${logData.headers['accept'] || 'N/A'}
Host               : ${logData.headers['host'] || 'N/A'}

QUERY PARAMETERS:
───────────────────────────────────────────────────────────────
${JSON.stringify(logData.queryParams, null, 2)}

REQUEST BODY:
───────────────────────────────────────────────────────────────
${logData.requestBody}

RESPONSE:
───────────────────────────────────────────────────────────────
Status Code        : ${logData.statusCode}
Response Time      : ${logData.responseTime}ms
═══════════════════════════════════════════════════════════════

`;
};

// Helper function to write log to file
const writeLog = (logEntry) => {
  fs.appendFile('log.txt', logEntry, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
};

// Create HTTP server
const server = http.createServer(async (req, res) => {
  const startTime = Date.now();
  const requestTimestamp = new Date().toISOString();
  const parsedUrl = url.parse(req.url, true);
  const endpoint = parsedUrl.pathname;
  const queryParams = parsedUrl.query;
  const clientIP = getClientIP(req);
  const method = req.method;
  const headers = req.headers;

  // Get request body
  const requestBody = await getRequestBody(req);

  // Set default headers
  res.setHeader('Content-Type', 'application/json');

  // Route handling
  let responseData;
  let statusCode = 200;

  if (endpoint === '/') {
    responseData = {
      message: 'Welcome to the Node.js HTTP Server!',
      description: 'This is the home page of the application.'
    };
  } else if (endpoint === '/about') {
    responseData = {
      message: 'About the Application',
      description: 'This is a simple HTTP server built with Node.js.',
      version: '1.0.0',
      author: 'Lab 9 Assignment',
      features: [
        'RESTful API endpoints',
        'Comprehensive request logging',
        'Error handling',
        'Query parameter support',
        'Request body parsing'
      ]
    };
  } else if (endpoint === '/contact') {
    responseData = {
      message: 'Contact Information',
      email: 'contact@example.com',
      description: 'Feel free to reach out to us for any inquiries.'
    };
  } else {
    statusCode = 404;
    responseData = {
      error: 'Not Found',
      message: `The endpoint '${endpoint}' does not exist.`,
      availableEndpoints: ['/', '/about', '/contact']
    };
  }

  // Calculate response time
  const responseTime = Date.now() - startTime;

  // Set status code
  res.statusCode = statusCode;

  // Send response
  res.end(JSON.stringify(responseData, null, 2));

  // Prepare log data
  const logData = {
    timestamp: requestTimestamp,
    method: method,
    url: req.url,
    endpoint: endpoint,
    clientIP: clientIP,
    headers: headers,
    queryParams: Object.keys(queryParams).length > 0 ? queryParams : 'No query parameters',
    requestBody: requestBody,
    statusCode: statusCode,
    responseTime: responseTime
  };

  // Write log to file
  const logEntry = formatLogEntry(logData);
  writeLog(logEntry);

  // Also log to console for debugging
  console.log(`[${requestTimestamp}] ${method} ${endpoint} - ${statusCode} - ${responseTime}ms`);
});

// Start the server
server.listen(PORT, () => {
  console.log(`╔═══════════════════════════════════════════════════════════════╗`);
  console.log(`║        Node.js HTTP Server - Lab 9 Assignment                ║`);
  console.log(`╚═══════════════════════════════════════════════════════════════╝`);
  console.log(`\n🚀 Server is running on http://localhost:${PORT}`);
  console.log(`\n📍 Available endpoints:`);
  console.log(`   • GET  http://localhost:${PORT}/`);
  console.log(`   • GET  http://localhost:${PORT}/about`);
  console.log(`   • GET  http://localhost:${PORT}/contact`);
  console.log(`\n📝 All requests are being logged to log.txt`);
  console.log(`\nPress CTRL+C to stop the server\n`);
});

// Handle server errors
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please use a different port.`);
  } else {
    console.error('❌ Server error:', err);
  }
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n🛑 Shutting down server gracefully...');
  server.close(() => {
    console.log('✅ Server closed successfully');
    process.exit(0);
  });
});
