var express = require('express');
var path = require('path');
var app = express();

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

var htmlPath = path.join(__dirname, 'dist');

app.use(express.static(htmlPath)); // set static files location, in this case the route, add a file name if not
app.listen(process.env.PORT || 3000);