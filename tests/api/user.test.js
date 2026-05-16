const request = require("supertest");

const app = require("../../src/app");

const pool = require("../../src/config/database");

describe("User APIs", () => {

  // TC01
  test("TC01 - Create user with valid data", async () => {

    const res = await request(app)
      .post("/users")
      .send({
        first_name: "Alfiya",
        last_name: "Pathan",
        email: `test${Date.now()}@gmail.com`,
        mobile: "9999999999",
        password: "password123",
      });

    console.log(res.body);

    expect(res.statusCode).toBe(200);

    expect(res.body.success).toBe(true);

    expect(res.body.data).toBeDefined();

    expect(res.body.data.password_hash).toBeUndefined();
  });

  // TC02
  test("TC02 - Missing first_name", async () => {

    const res = await request(app)
      .post("/users")
      .send({
        last_name: "Pathan",
        email: "test@gmail.com",
        mobile: "9999999999",
        password: "password123",
      });

    console.log(res.body);

    expect(res.statusCode).toBe(400);

    expect(res.body.success).toBe(false);
  });

  // TC03
  test("TC03 - Missing email", async () => {

    const res = await request(app)
      .post("/users")
      .send({
        first_name: "Alfiya",
        last_name: "Pathan",
        mobile: "9999999999",
        password: "password123",
      });

    console.log(res.body);

    expect(res.statusCode).toBe(400);

    expect(res.body.success).toBe(false);
  });

  // TC04
  test("TC04 - Invalid email format", async () => {

    const res = await request(app)
      .post("/users")
      .send({
        first_name: "Alfiya",
        last_name: "Pathan",
        email: "invalid-email",
        mobile: "9999999999",
        password: "password123",
      });

    console.log(res.body);

    expect(res.statusCode).toBe(400);

    expect(res.body.success).toBe(false);
  });

  // TC05
  test("TC05 - Empty request body", async () => {

    const res = await request(app)
      .post("/users")
      .send({});

    console.log(res.body);

    expect(res.statusCode).toBe(400);

    expect(res.body.success).toBe(false);
  });

  // TC06
  test("TC06 - Duplicate email", async () => {

    const duplicateEmail = `duplicate${Date.now()}@gmail.com`;

    // FIRST INSERT
    await request(app)
      .post("/users")
      .send({
        first_name: "User1",
        last_name: "Test",
        email: duplicateEmail,
        mobile: "9999999999",
        password: "password123",
      });

    // DUPLICATE INSERT
    const res = await request(app)
      .post("/users")
      .send({
        first_name: "User2",
        last_name: "Test",
        email: duplicateEmail,
        mobile: "8888888888",
        password: "password123",
      });

    console.log(res.body);

    expect(res.statusCode).toBe(409);

    expect(res.body.success).toBe(false);
  });

  // TC07
  test("TC07 - Weak password", async () => {

    const res = await request(app)
      .post("/users")
      .send({
        first_name: "Weak",
        last_name: "Password",
        email: `weak${Date.now()}@gmail.com`,
        mobile: "9999999999",
        password: "123",
      });

    console.log(res.body);

    expect(res.statusCode).toBe(400);

    expect(res.body.success).toBe(false);
  });

  // TC08 + TC09
  test("TC08/TC09 - Get all users", async () => {

    const res = await request(app)
      .get("/users");

    console.log(res.body);

    expect(res.statusCode).toBe(200);

    expect(res.body.success).toBe(true);

    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // TC10
  test("TC10 - Database empty handling", async () => {

    const res = await request(app)
      .get("/users");

    console.log(res.body);

    expect(res.statusCode).toBe(200);

    expect(res.body.success).toBe(true);

    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // TC11
  test("TC11 - DB error simulation", async () => {

    jest
      .spyOn(pool, "query")
      .mockRejectedValueOnce(new Error("DB Failed"));

    const res = await request(app)
      .get("/users");

    console.log(res.body);

    expect(res.statusCode).toBe(500);

    expect(res.body.success).toBe(false);
  });

});
