const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const config = require('./config');
const bdConfig = require('./config/bdConfig');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const users = require('./routes/users');
const passport = require('passport');


const app = express();
app.set('port', config.get('port'));
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + config.get('port'));
});

mongoose.connect(bdConfig.database);
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+bdConfig.database);
});
mongoose.connection.on('error', (err) => {
    console.log('Database error '+err);
});

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
require('./routes/index')(app);

//app.use('/users', users);







//Error handler
app.use(function (err, req, res, next) {
    //MODE_ENW
    if (app.get('env') == 'development') {
        // var errorHandler = express.errorHandler();
        // errorHandler(err, req, res, next);
        next(err);
    } else {
        res.send(500);
    }
});

