const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use('/', (req, res) => {
  const backendUrl = 'http://14.139.189.232:8087' + req.originalUrl;
  console.log(`Proxying request to: ${backendUrl}`);
  req.pipe(request(backendUrl)).pipe(res);
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
