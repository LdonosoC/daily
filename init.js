var app = require('./app');

require('./routes/member');

var server = app.listen(8282, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
});