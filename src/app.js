const express = require('express');
const morgan = require('morgan');
const app = express();
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

app.use(morgan('dev'));  // Add this line to use morgan middleware
app.use(express.json());
app.use('/users', userRoutes);

module.exports = app;
