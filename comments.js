//Create web server
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

//Load static files
app.use(express.static('public'));
app.use('/static', express.static(path.join(__dirname, 'public')));

//Load template engine
app.set('views', './views');
app.set('view engine', 'pug');

//Load routes
const routes = require('./routes/index');
app.use('/', routes);

//Error handling
app.use((req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    //res.locals.error = err;
    res.status(err.status);
    res.render('error', { err });
});

//Create server
app.listen(port, () => {
    console.log(`The application is running on localhost:${port}!`);
});