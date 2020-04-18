const express = require("express");
const path = require("path");
const fs = require("fs")
const assert = require('assert');
const multer = require("multer");
const cookie = require("cookie-parser");
const objectId = require("mongodb").ObjectID;
const redis = require("redis");
const redisPublisher = redis.createClient();
require("dotenv").config()

const app = express();
const MongoClient = require('mongodb').MongoClient;
app.use(cookie());

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
	console.log("recieved request")
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/html");
	res.sendFile(path.join(public, "index.html"));
});



// endpoint for uploading pictures
app.post('/upload', upload, async (req, res) => {
	if (!req.file) {
		// console.log(res);
		res.send("No file");
	} else {
		req.file.fieldname = `${req.file.fieldname}-${Date.now()}${path.extname(req.file.originalname)}`
		image = await db.collection(process.env.collection).insertOne(req.file);
		res.cookie("_id", image.insertedId)
		// console.log(`File inserted with id: ${image.insertedId}`);
		redisPublisher.publish("processing", `${image.insertedId}`);
		console.log(`File inserted in DB and queue with id: ${image.insertedId}`);
		res.redirect("/")

	}
});
// get request for getting the images associated with this account
app.get("/upload/:type", async (req, res) => {
	let doc
	try {
		let cursor = await db.collection(process.env.collection).find({ "_id": objectId(req.cookies._id) }).limit(1);
		doc = await cursor.next();
	} catch (e) {
		console.log("error with database")
		console.log(e)
		res.status(404).send("No images found")
	}
	if (!doc) {
		console.log(req.cookies._id)
		res.status(404).send("No images found. Doc null")

	} else {
		res.status(200)

		if (!req.param.type) {
			res.send("need type")
		} else
			if (req.param.type.toLowerCase() === "original") {
				res.contentType("jpeg")
				res.end(doc.buffer.buffer, "binary")
			}
			else if (req.param.type.toLowerCase() === "color") {
				if (!doc.color) {
					res.send("Processing")
				} else {
					res.contentType("jpeg")
					res.end(doc.color.buffer, "binary")
				}
			}else{
				res.send("No images")
			}
	}
})







app.listen(PORT, () => {
	console.log(`Listening on: http://localhost:${PORT}`);
})


// Check File Type
function checkFileType(file, cb) {
	// Allowed ext
	const filetypes = /jpeg|jpg|png/;
	// Check ext
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// Check mime
	const mimetype = filetypes.test(file.mimetype);

	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb('Error: Images Only!');
	}
}
