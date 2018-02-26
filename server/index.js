const express = require('express');
const app = express();
const request = require('request');
const path = require('path');

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(express.static(path.resolve(__dirname, '../react/build')));

if (process.env.NODE_ENV !== 'production') {
	const r = require('dotenv').load();
}
const API_KEY = process.env.MSW_API_KEY;
const router = express.Router();

router.get('/msw/384', function (req, res) {
	const url = `https://magicseaweed.com/api/${API_KEY}/forecast/?spot_id=384`;
	request(url, (err, response, body) => {
		res.send({express: body});
	});
})

router.get('/msw/383', function (req, res) {
	const url = `https://magicseaweed.com/api/${API_KEY}/forecast/?spot_id=383`;
	request(url, (err, response, body) => {
		res.send({express: body});
	});
})


app.use(router);

app.get('/', function(request, response) {
	response.sendFile(path.resolve(__dirname, '../react/build', 'index.html'));
});

const sslRedirect = () => {
  function requestIsSecure(req) {
    return req.header('x-forwarded-proto') === 'https' || req.secure === true;
  }

  return (req, res, next) => {
    if (requestIsSecure(req)) {
      next();
    } else {
      res.redirect(301, `https://${req.header('host')}${req.url}`);
    }
  };
};

if (process.env.NODE_ENV === 'production') {
	app.use(sslRedirect);
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Example app  on port ${port}!`))
