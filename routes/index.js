var express = require('express');
var router = express.Router();
if (!process.env.API_KEY && !process.env.API_SECRET) {
  throw "Environment variables API_KEY and API_SECRET must be defined.";
}
var OpenTok = require('opentok'),
    opentok = new OpenTok(process.env.API_KEY, process.env.API_SECRET);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'OpenTok Precall Web Demo' });
});

router.get('/session', function(req, res, next) {
  var sessionId, 
      token;
  opentok.createSession({mediaMode: "routed"}, function(error, session) {
    if (error) {
      console.log("Error creating session:", error)
    } else {
      sessionId = session.sessionId;
      token = opentok.generateToken(sessionId);
      res.end(JSON.stringify({
        "apiKey": process.env.API_KEY,
        "sessionId": sessionId,
        "token": token
      }));
    }
  });
});

module.exports = router;
