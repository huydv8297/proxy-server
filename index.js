// const { createProxyMiddleware } = require('http-proxy-middleware');
// const express = require('express');

// const app = express();
// const PORT = process.env.PORT || 3000;

// console.log("Start proxy server");

// app.use('/', createProxyMiddleware({
//     target: 'https://www.google.com', // Change target URL here
//     changeOrigin: true,
// }));

// app.listen(PORT, () => {
//     console.log(`Proxy server is running on port ${PORT}`);
// });

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// console.log(`Get request`);
// });
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const path = parsedUrl.path; // Get the path from the request URL

  // Proxy logic to forward the request to google.com
  const options = {
    hostname: 'google.com',
    path: path,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Add any necessary headers, including CORS headers if needed
    }
  };

  const proxyReq = http.request(options, (proxyRes) => {
    let data = '';

    // Receive data from the proxy response
    proxyRes.on('data', (chunk) => {
      data += chunk;
    });

    // Forward data to the client response
    proxyRes.on('end', () => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      res.end(data);
    });
  });

  // Handle errors from the proxy request
  proxyReq.on('error', (err) => {
    console.error('Proxy request error:', err);
    res.statusCode = 500;
    res.end('Proxy request failed');
  });

  // End the proxy request
  proxyReq.end();
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
