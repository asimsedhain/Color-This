const app = require("../app")
const expect = require('chai').expect;
const request = require("supertest");
const redis = require("redis");
const MongoClient = require('mongodb').MongoClient;
const path = require("path")


describe("API Tests", () => {

	// Env Varibales
	const COLLECTION = process.env.collection || "images"
	const DBURI = process.env.DBURI || "mongodb+srv://tester:L3u1kKTEYb3Z9Omh@images-ulhix.mongodb.net/test?retryWrites=true&w=majority";
	const DBNAME = process.env.dbname || "Color"
	const LISTNAME = process.env.list_name || "processing"


	let dbClient;
	let redisPublisher;



	before("Setting up", async () => {

		// Passing the env varibles to app
		app.set("COLLECTION", COLLECTION)
		app.set("LISTNAME", LISTNAME)

		// Creates a redis client
		// Redis server does not need to be there
		// All the events are queued until server is connected
		// No server is needed for the tests to work
		redisPublisher = redis.createClient();
		app.set("redis", redisPublisher)

		// Connecting to the database
		// Database needs to be connected to get the data
		const client = await MongoClient.connect(DBURI);
		const db = client.db(DBNAME);
		app.set("db", db)
		dbClient = client
	})



	// Testing all the GET endpoints
	describe("# Get", () => {

		// Testing all the sample image ids
		for (let id of ["5ec14ad608db08b724a2b4e0", "5ec14be608db082acaa2b4e1", "5ec14c1608db080a3ca2b4e3"]) {
			for (let type of ["original", "color"]) {
				it(`should get ${type} sample image with id: ${id}`, async () => {
					const res = await request(app).get(`/upload/${type}?id=${id}`)
					expect(res.statusCode).to.equal(200);
					expect(res.headers["content-type"]).to.eql("image/jpeg")
					expect(res.body).to.be.an("Uint8Array");
				})
			}
		}

		// Testing invalid id
		it("should return object with image field and null value", async () => {
			const res = await request(app).get("/upload/color?id=asdfaf");
			expect(res.statusCode).to.equal(404)
			expect(res.headers["content-type"]).to.eql("application/json; charset=utf-8")
			expect(res.body).to.be.a("object")
			expect(res.body).to.have.property("Image")
			expect(res.body.Image).to.be.null;
		})


	})

	// Testing all the post endpoints
	describe("# Post", () => {

		// Testing image uploads
		for (let imagePath of ["./build/sample_image_0.jpg", "../screen_shot.jpg", "../system_architecture.jpg"]) {
			it("should upload the image and return a imageId", async () => {
				const res = await request(app).post("/upload").attach("Original", path.resolve(imagePath))
				expect(res.statusCode).to.equal(200);
				expect(res.headers["content-type"]).to.eql("application/json; charset=utf-8")
				expect(res.body).to.have.property("imageId")
				expect(res.body.imageId).to.be.a("string")
			})
		}
		
	})


	after("Closing Connections", () => {
		dbClient.close();
		redisPublisher.quit();
	})


})