const request = require("supertest");
const { Category } = require("../../../../models/category");
const { User } = require("../../../../models/user");

describe("User Auth /", () => {
	beforeEach(() => {
		server = require("../../../../index");
	});
	afterEach(async () => {
		server.close();
		await Category.remove({});
	});

	let token;

	const exec = () => {
		return request(server)
			.post("/api/category")
			.set("x-auth-token", token)
			.send({ name: "samsung" });
	};
	beforeEach(() => {
		token = new User().generateAuthToken();
	});

	it("Should Return the 401 if no token provided.", async () => {
		token = "";
		const res = await exec();
		expect(res.status).toBe(401);
	});
	it("Should Return the 400 if token is InValid.", async () => {
		token = "a";
		const res = await exec();
		expect(res.status).toBe(400);
	});
	it("Should Return the 200 if token is Valid.", async () => {
		const res = await exec();
		expect(res.status).toBe(200);
});
