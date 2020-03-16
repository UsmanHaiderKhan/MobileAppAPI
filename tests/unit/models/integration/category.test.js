const request = require("supertest");
const { Category } = require("../../../../models/category");
const { User } = require("../../../../models/user");
const mongoose = require("mongoose");
let server;

describe("/api/category", () => {
	beforeEach(() => {
		server = require("../../../../index");
	});
	afterEach(async () => {
		server.close();
		await Category.remove({});
	});
	describe("GET /", () => {
		it("it should return the categories of Mobiles...", async () => {
			await Category.collection.insertMany([
				{
					name: "Samsung"
				},
				{
					name: "Xiaomi"
				}
			]);

			const res = await request(server).get("/api/category");
			expect(res.status).toBe(200);
			expect(res.body.length).toBe(2);

			expect(res.body.some(g => g.name === "Samsung")).toBeTruthy();
			expect(res.body.some(g => g.name === "Xiaomi")).toBeTruthy();
		});
	});

	describe("GET /:id", () => {
		it("it Should Return a Category if Id Of Category is Valid.", async () => {
			const category = new Category({ name: "Samsung" });
			await category.save();
			const res = await request(server).get("/api/category/" + category._id);

			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty("name", category.name);
		});

		it("it Should Return 404 Error if id is Invalid.", async () => {
			const res = await request(server).get("/api/category/1");
			expect(res.status).toBe(404);
		});
		it("it Should Return 404 Error if no category Available At This Id", async () => {
			const id = mongoose.Types.ObjectId();
			const res = await request(server).get("/api/category/" + id);
			expect(res.status).toBe(404);
		});
	});

	describe("POST", () => {
		let name;
		let token;

		const exec = async () => {
			return await request(server)
				.post("/api/category")
				.set("x-auth-token", token)
				.send({ name });
		};

		beforeEach(() => {
			token = new User().generateAuthToken();
			name = "Samsung";
		});

		it("it Should Return a Non-Auth client With 401.", async () => {
			token = "";
			const res = await exec();
			expect(res.status).toBe(401);
		});
		it("it Should return if input less then 3 character.", async () => {
			name = "14";
			const res = await exec();
			expect(res.status).toBe(400);
		});
		it("it Should return if input more then 50 character.", async () => {
			name = new Array(52).join("a");
			const res = await exec();
			expect(res.status).toBe(400);
		});
		it("it Should Save the Category if it is valid.", async () => {
			await exec();
			const category = await Category({ name: "Samsung" });
			expect(category).not.toBeNull();
		});
		it("it Should return the Category if it is valid.", async () => {
			const res = await exec();
			expect(res.body).toHaveProperty("_id");
			expect(res.body).toHaveProperty("name", "Samsung");
		});
	});
});
