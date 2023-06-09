var express = require('express');
require("dotenv").config();
require("./middleware/database").connect();
const bodyParser = require('body-parser');
var expressWinston = require('express-winston');
var winston = require('winston'); // for transports.Console
var app = module.exports = express();

const cors = require("cors");
app.use(cors());

const mainApi = require('./router/mainApi')
require('winston-daily-rotate-file');
var emitter = require('events').EventEmitter;
var eventsEmitter = new emitter();
const { API_PORT } = process.env;
const port = 4090 || API_PORT;

//app.use(express.methodOverride());
// Let's make our express `Router` first.
var router = express.Router();
router.use(bodyParser.urlencoded({
  extended: true
})) 
router.use('/uploads', express.static('uploads'));
router.use(bodyParser.json({limit: '50mb'}));
router.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
router.use(bodyParser.json())
router.get('/error', function(req, res, next) {
  // here we cause an error in the pipeline so we see express-winston in action.
  return next(new Error("This is an error and it should be logged to the console"));
});

router.use('/api', mainApi)
router.use(cors());
// express-winston logger makes sense BEFORE the router
app.use(expressWinston.logger({
  transports: [
    new winston.transports.File({
      //path to log file
      filename: 'logs/log.json',
      level: 'debug'
    })
  ],
  requestWhitelist: ['headers', 'query'],  //these are not included in the standard StackDriver httpRequest
  //responseWhitelist: ['body'],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  dynamicMeta: (req, res) => {
    const httpRequest = {}
    const meta = {}
    if (req) { 
        meta.httpRequest = httpRequest
        httpRequest.requestMethod = req.method
        httpRequest.requestUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
        httpRequest.protocol = `HTTP/${req.httpVersion}`
        // httpRequest.remoteIp = req.ip // this includes both ipv6 and ipv4 addresses separated by ':'
        //httpRequest.remoteIp = req.ip.indexOf(':') >= 0 ? req.ip.substring(req.ip.lastIndexOf(':') + 1) : req.ip   // just ipv4
        httpRequest.label=(res.statusCode===403||res.statusCode===401)?"False":"True"
        httpRequest.requestSize = req.socket.bytesRead
        httpRequest.userAgent = req.get('User-Agent')
        httpRequest.referrer = req.get('Referrer')
    }
    return meta
}
}));

// Now we can tell the app to use our routing code:
app.use(router);

// express-winston errorLogger makes sense AFTER the router.
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.DailyRotateFile({
      //path to log file
      name: 'file',
      datePattern: 'yyyy-MM-dd',
      prepend:true,
      colorize: true,
      json: true,
      filename: 'logs/error_log',
      maxsize: 50 * 1024 * 1024,
      maxFiles: 10,
      level: 'error'
    })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}));

// Optionally you can include your custom error handler after the logging.

app.listen(port, function(){
  console.log("logger listening on port %d in %s mode", this.address().port, app.settings.env);
});