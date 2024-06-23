const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', createProxyMiddleware({
    target: 'https://www.example.com', // Change target URL here
    changeOrigin: true,
}));

app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
