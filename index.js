const express = require("express");
const path = require("path");
const fs = require("fs")
const assert = require('assert');
const multer = require("multer");
require("dotenv").config()

const app = express();
const MongoClient = require('mongodb').MongoClient;

let db;

const PORT = process.env.PORT;


MongoClient.connect(process.env.DBURI, async function (err, client) {
	console.log("Connected successfully to server");

	db = client.db(process.env.dbname);

});


const storage = multer.memoryStorage()
const upload = multer({
	storage: storage,
	limits: { fileSize: 1000000 },
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	}
}).single("Original");



// serving the static contents
app.use(express.static("public"));



//handling the first endpoint
app.get("/", (req, res) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/html");
	res.sendFile(path.join(public, "index.html"));
});




app.post('/upload', upload, (req, res) => {
	if(!req.file){
		
		// console.log(res);
		res.send("No file");
	}else{
		req.file.fieldname = `${req.file.fieldname}-${Date.now()}${path.extname(req.file.originalname)}`
		db.collection(process.env.collection).insertOne(req.file);
		console.log("File inserted");
		res.send(`Uploaded ${req.file.fieldname}`);

	}
  });




app.listen(PORT, () => {
	console.log(`Listening on: http://localhost:${PORT}`);
})


// Check File Type
function checkFileType(file, cb){
	// Allowed ext
	const filetypes = /jpeg|jpg|png/;
	// Check ext
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// Check mime
	const mimetype = filetypes.test(file.mimetype);
  
	if(mimetype && extname){
	  return cb(null,true);
	} else {
	  cb('Error: Images Only!');
	}
  }
