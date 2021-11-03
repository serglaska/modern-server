const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const rateLimit = require('express-rate-limit');
const userRoute = require('./routers/user.routers');
const { appConfigs } = require('./configs');
require('dotenv').config();
// /////////////////////////////////////////////////////////////////////////

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000
});
app.use(cors({
  _origin: _configureCORS
}));
app.use(limiter);
const staticPath = path.join(__dirname, 'static');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));
app.use(helmet());
if (process.env.ENV === 'dev') {
  // eslint-disable-next-line import/no-extraneous-dependencies
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

app.use('/', userRoute);
app.listen(appConfigs.PORT, () => console.log(`Port was started on port  ${appConfigs.PORT}`));

function _configureCORS(origin, callback) {
  const whiteList = appConfigs.ALLOWED_ORIGIN;
  if (!origin) {
    return (callback(null, true));
  }

  if ([whiteList].includes(origin)) {
    return callback(new Error('CORS Mistakes'), false);
  }

  return callback(null, true);
}
