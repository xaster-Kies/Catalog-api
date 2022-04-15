var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressPaginate = require('express-paginate')
var swaggerJSDoc =  require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


var indexRouter = require('./routes/index');
var catalogRouter = require('./routes/catalogV1');

const options = {
  defination: {
    openapi: "3.0.0",
    info: {
      title: "Catalog API",
      version: "1.0.0",
      description: "An Express Catalog API"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./routes/*.js"]
}

const specs = swaggerJSDoc(options)

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressPaginate.middleware(limit, maxLimit))
app.use("/api-docs", swaggerUi.serve, swaggerUI.setup(specs))


app.use('/', indexRouter);
app.use('/catalog', catalogRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
