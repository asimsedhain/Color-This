const express = require("express");
const path = require("path");
const multer = require("multer");
const cookie = require("cookie-parser");
const objectId = require("mongodb").ObjectID;
const redis = require("redis");
const cors = require("cors");
const redisPublisher = redis.createClient({ host: "redis", port: 6379 });

const app = express();
const MongoClient = require('mongodb').MongoClient;
app.use(cookie());
app.use(cors());
let db;

const PORT = process.env.PORT;


MongoClient.connect(process.env.DBURI, async function (err, client) {
	console.log("Connected successfully to server");

	db = client.db(process.env.dbname);

});


const storage = multer.memoryStorage()
const upload = multer({
	storage: storage,
	limits: { fileSize: 16000000 },
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



// endpoint for uploading pictures
app.post('/upload', upload, async (req, res) => {
	if (!req.file) {

		res.status(404).contentType("application/json").send(JSON.stringify({ "Image": null }));
	} else {
		req.file.fieldname = `${req.file.fieldname}-${Date.now()}${path.extname(req.file.originalname)}`
		image = await db.collection(process.env.collection).insertOne(req.file);
		redisPublisher.publish("processing", `${image.insertedId}`);
		console.log(`File inserted in DB and queue with id: ${image.insertedId}`);
		res.contentType("application/json");
		res.send(JSON.stringify({"imageId": image.insertedId}));

	}
});
// get request for getting the images associated with this account
app.get("/upload/:type", async (req, res) => {
	let doc
	if (!req.query.id) {
		res.status(404).contentType("application/json").send(JSON.stringify({ "Image": null }));
		return
	}
	
	try {
		let cursor = await db.collection(process.env.collection).find({ "_id": objectId(req.query.id) }).limit(1);
		doc = await cursor.next();
	} catch (e) {
		console.log("error with database")
		console.log(e)
		res.status(404).contentType("application/json").send(JSON.stringify({ "Image": null }));
	}
	if (!doc) {
		console.log(req.query._id)
		console.log("I am here")
		res.status(404).contentType("application/json").send(JSON.stringify({ "Image": null }));
	} else {

		if (!req.params.type) {
		res.status(404).contentType("application/json").send(JSON.stringify({ "Image": null }));
		} else
			if (req.params.type.toLowerCase() === "original") {
				res.status(200)
				res.contentType("jpeg")
				res.end(doc.buffer.buffer, "binary")
			}
			else if (req.params.type.toLowerCase() === "color") {
				if (!doc.color) {
		res.status(404).contentType("application/json").send(JSON.stringify({ "Image": null }));
				} else {
				res.status(200)
					res.contentType("jpeg")
					res.end(doc.color.buffer, "binary")
				}
			} else {
		res.status(404).contentType("application/json").send(JSON.stringify({ "Image": null }));
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
