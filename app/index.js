const express = require("express");
const path = require("path");
const multer = require("multer");
const cookie = require("cookie-parser");
const objectId = require("mongodb").ObjectID;
const redis = require("redis");
const cors = require("cors");
const redisPublisher = redis.createClient({ host: "redis", port: 6379 });

// Creating the express, mongoclient and also the port from environment varible
const PORT = process.env.PORT;
const app = express();
const MongoClient = require('mongodb').MongoClient;
const storage = multer.memoryStorage()

// Database variable
let db;


// Using middleware
app.use(cookie());
app.use(cors());


// Connecting to the database
MongoClient.connect(process.env.DBURI, async function (err, client) {
	console.log(`${new Date().toLocaleString()}Connected successfully to server`);

	db = client.db(process.env.dbname);

});

// Setting multer for uploading files
const upload = multer({
	storage: storage,
	limits: { fileSize: 16000000 },
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	}
}).single("Original");



// serving the static contents
app.use(express.static("public"));



// Handling the first endpoint
// This will return the homepage
app.get("/", (req, res) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/html");
	res.sendFile(path.join(public, "index.html"));
});



// Endpoint for uploading pictures
// Uploads the picture to the queue
// Uploads the metadata to the database
// Sends the id back to the client 
app.post('/upload', upload, async (req, res) => {
	if (!req.file) {
		res.status(404).contentType("application/json").send(JSON.stringify({ "Image": null }));
	} else {

		req.file.fieldname = `${Date.now()}${path.extname(req.file.originalname)}`

		// Inserting metadata to the database
		image = await db.collection(process.env.collection).insertOne({ fieldname: req.file.fieldname, originalname: req.file.originalname, encoding: req.file.encoding, mimetype: req.file.mimetype, size: req.file.size });

		// Inserting the file to the queue
		redisPublisher.lpush(process.env.list_name, JSON.stringify({ id: image.insertedId, original: req.file.buffer }));

		// Logging
		console.log(`${new Date().toLocaleString()}: File inserted in DB and queue with id: ${image.insertedId}`);

		// Sending the id back to the client
		res.contentType("application/json");
		res.send(JSON.stringify({ "imageId": image.insertedId }));

	}
});


// Endpoint that handles the request for the image
// Needs to have a id query param
// type: original | color
// Sends the requested image of the type and id
app.get("/upload/:type", async (req, res) => {
	try {
		let cursor = await db.collection(process.env.collection).find({ "_id": objectId(req.query.id) }).limit(1);
		let doc = await cursor.next();
		res.status(200)
		res.contentType("jpeg")
		res.end(doc[req.params.type.toLocaleLowerCase()].buffer, "binary")


	} catch (e) {
		console.log(`${new Date().toLocaleString()}: ${e}`)
		res.status(404).contentType("application/json").send(JSON.stringify({ "Image": null }));

	}
})



// Starts listening
app.listen(PORT, () => {
	console.log(`${new Date().toLocaleString()}: Listening on: http://localhost:${PORT}`);
})


// Check File Type
// Middleware helper function
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
