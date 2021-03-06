/************** Module Dependencies **************/
var api_route = require('./routes/api');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cronJob = require('cron').CronJob;
var email = require('./email/email');
var env = require('./env');
var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var logger = require('morgan');
var path = require('path');
var queries = require('./database/all_queries');
var routes = require('./routes/index');
var session = require('express-session');
var similarity = require('./seating_chart_algorithm/similarity_algorithm');

/**************** Database Connection ****************/
var dbconnect = queries.getConnection();
var sess = {
  secret: env.key,
  resave: true,
  saveUninitialized: true,
  employee: {}
};
app.use(session(sess));

/************** Setting Views for Jade Pages **************/
// view engine setup. It joins the current directory name with view such as /garre00/Documents/GitHub/isc-backend/views
app.set('views', path.join(__dirname, 'views'));

// Add a template engine with Express
app.set('view engine', 'jade');

/************** Use the Parser for the Jade Pages **************/
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(function (error, req, res, next){
    var result ={
      'error': true,
      'message': 'invalid json'
    };
    res.status(400).json(result)
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/************** Static files like js, CSS, images **************/
// Reference all materials in the public directory
app.use(express.static(path.join(__dirname, 'public')));

// apply CORS middleware
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", (req.headers.origin) ? req.headers.origin : '*');
  res.header("Access-Control-Allow-Headers", "Content-Type, X-CSRF-Token, X-Requested-With, X-Access-Token, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, X-File-Name");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

/************** Routers for Web Pages **************/
// Use the router for the webpages
app.use('/', routes);
app.use('/api', api_route);

/************** Execute Email Jobs **************/
email.deletePasswordResetTokens;
email.dailyEmailJob;
email.fiveDayEmailJob;
email.tenDayEmailJob;
email.quarterlyEmailJob;;
email.employeeSimilarity;

/************** 404 and Error Handlers **************/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


var employeeSimilarity = new cronJob( '*/15 * * * *', function() {
  similarity.Start();
},  null, true);

// Export the app module
module.exports = app;
