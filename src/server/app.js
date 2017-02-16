const express = require('express');
const path = require(`path`);
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(require('./routes/daily-tasks'));
app.use(require('./routes/grocery-list'));
app.use(require('./routes/project'));

module.exports = app;
