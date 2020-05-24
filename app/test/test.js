const app = require("../app")
const expect = require('chai').expect;
const request = require("supertest");
const redis = require("redis");
const MongoClient = require('mongodb').MongoClient;
const fs = require("fs");
const FormData = require("form-data");


describe("API Tests", () => {

	const COLLECTION = process.env.collection || "images"
	const DBURI = process.env.DBURI || "mongodb+srv://tester:L3u1kKTEYb3Z9Omh@images-ulhix.mongodb.net/test?retryWrites=true&w=majority";
	const DBNAME = process.env.dbname || "Color"
	const LISTNAME = process.env.list_name || "processing"
	let dbClient;
	let redisPublisher;



	before("Setting up", (done) => {
		app.set("COLLECTION", COLLECTION)
		app.set("LISTNAME", LISTNAME)

		redisPublisher = redis.createClient();
		console.log("Connected to redis");

		app.set("redis", redisPublisher)
		MongoClient.connect(DBURI, function (err, client) {
			if (err) {
				console.log(err)
			}
			console.log(`${new Date().toLocaleString()} Connected successfully to server`);
			dbClient = client;
			const db = client.db(DBNAME);
			app.set("db", db)
			done()
		});
	})

	


	let imageIds = ["5ec14ad608db08b724a2b4e0", "5ec14be608db082acaa2b4e1", "5ec14c1608db080a3ca2b4e3"];

	describe("# Get", () => {

		// Testing all the sample image ids
		for (let id of imageIds) {
			for (let type of ["original", "color"]) {
				it(`should get ${type} sample image with id: ${id}`, async () => {
					const res = await request(app).get(`/upload/${type}?id=${id}`)
					expect(res.statusCode).to.equal(200);
					expect(res.headers["content-type"]).to.eql("image/jpeg")
					expect(res.body).to.be.an("Uint8Array");
				})
			}
		}

		it("should return object with image field and null value", async () => {
			const res = await request(app).get("/upload/color?id=asdfaf");
			expect(res.statusCode).to.equal(404)
			expect(res.headers["content-type"]).to.eql("application/json; charset=utf-8")
			expect(res.body).to.be.a("object")
			expect(res.body.Image).to.be.null;
		})


	})

	// describe("# Post", () => {
	// 	it("should upload the image and return a imageId", async () => {

	// 		image = fs.readFileSync(".\\build\\sample_image_0.jpg")
	// 		// console.log(image)
	// 		const data = new FormData()
	// 		data.append('Original', image)
	// 		const res = await request(app).post("/upload").send(JSON.stringify(data));
	// 		// expect(res.statusCode).to.equal(200);
	// 		// expect(res.headers["content-type"]).to.eql("application/json; charset=utf-8")
	// 		console.log(res.body)
	// 	})
	// })


	after("finisheing", () => {
		dbClient.close();
		redisPublisher.quit();
	})


})