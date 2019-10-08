const express = require('express');
const app = express();
// Load model plugins
require('./models/register-plugins');

// MIDDLEWARE
const morgan = require('morgan');
const ensureAuth = require('./middleware/ensure-auth');
const checkConnection = require('./middleware/check-connection');
app.use(morgan('dev'));
if(process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static('public'));
app.use(checkConnection());

// IS ALIVE TEST
app.get('/hello', (req, res) => res.send('world'));

// API ROUTES
const auth = require('./routes/auth');
const me = require('./routes/me');
app.use('/api/auth', auth);
app.use('/api/me', ensureAuth(), me);

// NOT FOUND
const api404 = require('./middleware/api-404');
const html404 = require('./middleware/html-404');
app.use('/api', api404);
app.use(html404);

// ERRORS
const errorHandler = require('./middleware/error-handler');
app.use(errorHandler);

module.exports = app;