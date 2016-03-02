var express = require('express');
var app = express();

app.use('/public', express.static('public'));
app.use('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

app.listen(3000);
