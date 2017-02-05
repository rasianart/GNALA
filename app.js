const express      = require('express');
const cookieParser = require('cookie-parser');
const fs           = require('fs');
const ejs          = require('ejs'); 
const app          = new express();
const bodyParser   = require('body-parser'); 
const http         = require('http');
const path         = require('path');
const env          = process.env;
const storeImageLocally = require('./getImage.js');
const jsonParser = bodyParser.json()

app.use(bodyParser.urlencoded({ extended: false }));
app.enable('trust proxy');
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');

app.get('/', (req,res) => {
	res.render('gnala');
});
app.get('/old', (req,res) => {
	res.render('index', {
		gifBlock: '<blockquote class="imgur-embed-pub" lang="en" data-id="SleO13T"><a href="//imgur.com/SleO13T">Let us take a moment a remember when</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>'
	});
});

app.post('/storeimage', jsonParser,(req,res) => {
	storeImageLocally(req.body.imgSrc, res);
	
});

let server = app.listen(env.NODE_PORT || 8000, env.NODE_IP || 'localhost', () => {
	console.log('At the URL: http://localhost:8000');
})