// Steps to get node app to run from new.
// 1) npm init
// 2) npm i request --save
// 3) Verify package.json package dependencies
// 4) node app.js or npm start (if  "scripts": {"start": "node app.js"})
// 5) If nodemon is installed then it will monitor for any changes in the node.js application and automatically restart the server. Useage: nodemon app.js

//  Create the server
const http = require('http'); // Include system core module
const hostname = '127.0.0.1'; // Loopback address
const port = 3000;            // Port to listen on
const fs = require('fs');     // Filesystem needed to get html file

// Pass in file and callback with results.
fs.readFile('index.html', (err, html) => {
	if(err) {
		throw err;
	}

	const server = http.createServer((req, res) => {
    res.statusCode = 200;
		res.setHeader('content-type', 'text/html'); // Parses the html page
		res.write(html);
		res.end();
	});

	server.listen(port, hostname, () => {
		console.log('Server started on port ' + port);
	});
});

// Connect to Azure and request image data
const request = require('request');
const subscriptionKey = '';

const uriBase =
    'https://westeurope.api.cognitive.microsoft.com/vision/v2.0/analyze';

const imageUrl =
    'http://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg';

// Request parameters.
const params = {
    'visualFeatures': 'Categories,Description,Color',
    'details': '',
    'language': 'en'
};

const options = {
    uri: uriBase,
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
};

request.post(options, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
    return;
  }
  let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
  console.log('JSON Response\n');
  console.log(jsonResponse);

  // Create test.json file in application root folder.
  fs.writeFile("test.json", jsonResponse, function(err) {
    if (err) {
        console.log(err);
    }
    else {
      console.log('\nJSON written to File');
    }
  });
});

