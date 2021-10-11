const helmet = require('helmet');
const express = require('express');
const rateLimit = require('express-rate-limit');
////////////////////////////////////////////////////////////////////////////

app.use(limiter);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000
});

