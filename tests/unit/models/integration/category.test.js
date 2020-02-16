const request = require("supertest");
const { Category } = require("../../../../models/category");
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
});
