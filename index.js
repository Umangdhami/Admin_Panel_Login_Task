const express = require('express');
const app = express();
const port = 5011;
const route = require('./routes/route')
const body_parser = require('body-parser');
const path = require('path')
const mongoose = require('./database/userData')
const cookie_parser = require('cookie-parser')

app.set('view engine', 'ejs');
app.use(body_parser.urlencoded({ extended: true}))
app.use(cookie_parser())

app.use('/', route)
app.use(express.static(path.join(__dirname, './public/')));

app.listen(port, () => {
    console.log(`Server Run on Port ${port}`);
})