const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./routes/api/auth');
const usersRouter = require('./routes/api/users');
const transactionsRouter = require('./routes/api/transactions');
const currencyRouter = require('./routes/api/currency');
const categoriesRouter = require('./routes/api/categories');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(logger(formatsLogger));
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/currency', currencyRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
