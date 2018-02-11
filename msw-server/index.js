const express = require('express');
const app = express();
const request = require('request');
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load({path: '../.env'});
}
const API_KEY = process.env.MSW_API_KEY;


const router = express.Router();

const https = require('https');

// respond with "hello world" when a GET request is made to the homepage
router.get('/msw', function (req, res) {
	const url = `https://magicseaweed.com/api/${API_KEY}/forecast/?spot_id=284`;
	request(url, (err, response, body) => {
		res.send({express: body});
	});
})

app.use(router);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Example app  on port ${port}!`))