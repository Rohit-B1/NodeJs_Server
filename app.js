// const multer = require('multer')
// const fs = require('fs');
// const path = require('path')
// const express = require('express');
// const https = require('https');

// const key = fs.readFileSync('D:/Node_workspace/Simulation_server/myExpressApp/certificates/server.decrypted.key');
// const cert = fs.readFileSync('D:/Node_workspace/Simulation_server/myExpressApp/certificates/server.cert');

// const app = express();

// const server = https.createServer({ key, cert }, app);

// const upload = multer({ storage: storage });

// app.get('/', (req, res, next) => {
//   console.log("Get method called")
//   res.status(200).send('Hello world!');
// });

// var storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, './uploads')
//   },

//   filename: function (req, file, callback) {
//     callback(null, file.originalname)
//   }
// })

// server.listen(3000, () => {
//   console.log(`Server is listening on port: 3000`);
// });

// app.post('/postdata', upload.any(), function (req, res, next) {
//   console.log("Post method called")
//   var files = req.files;
//   console.log(req.files);
//   console.log(req.rawHeaders);
//   res.status(200).json({
//     message: "Data received successfully"
//   });
// });


//Importing modules that are required to store the file
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
const multer = require('multer')
var fs = require('fs');
const path = require('path')
const upload = multer({ storage: storage });

//starting the server to listen to port 3000
var server = app.listen(3000, function () {
  console.log("Server is now running...");
});

//Note: Please make sure the folder is created, the callback doesnot create a folder on it's own
var storage = multer.diskStorage({

  //To store the data in particular path/folder
  destination: function (req, file, callback) {
    callback(null, './uploads')
  },

  //Renaming of file if required
  filename: function (req, file, callback) {
    console.log(file);
    callback(null, file.originalname)
  }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("hello there");
})

//Multer is middle-ware, which provides the option to handle the files
app.post('/postdata/', upload.any(), function (req, res, next) {
  var files = req.files;
  //print the files details in the log
  console.log(req.files);
  if (files) {//Checks to see if any attached files
    files.forEach(function (file) {
      console.log('FILE');
      console.log(JSON.stringify(file));//contents of file
    });
  }

  console.log(req.rawHeaders);
  res.status(200).json({
    message: "Data received successfully"
  });
});
