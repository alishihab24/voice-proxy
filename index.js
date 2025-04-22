const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

const BACKEND_URL = 'http://14.139.189.232:8087';

app.use(cors());

// Ping route for uptime monitoring
app.get('/ping', (req, res) => {
  res.send('pong');
});

// Main proxy handler
app.use('/', (req, res) => {
  const targetUrl = BACKEND_URL + req.originalUrl;
  console.log(`Proxying request to: ${targetUrl}`);

  try {
    const proxyRequest = request(targetUrl);

    proxyRequest.on('error', (err) => {
      console.error('Proxy error:', err.message);
      res.status(502).send('Error reaching backend service.');
    });

    req.pipe(proxyRequest).pipe(res);
  } catch (err) {
    console.error('Unexpected error:', err.message);
    res.status(500).send('Internal server error.');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
