const request = require("supertest");

const app = require("../../src/app");

const pool = require("../../src/config/database");

describe("Role APIs", () => {

  // TC01
  test("TC01 - Create role with valid data", async () => {

    const res = await request(app)
      .post("/roles")
      .send({
        name: "Automation Role",
        code: `ROLE_${Date.now()}`,
        description: "Testing role",
      });

    console.log(res.body);

    expect(res.statusCode).toBe(200);

    expect(res.body.success).toBe(true);

    expect(res.body.data).toBeDefined();
  });

  // TC02
  test("TC02 - Missing name", async () => {

    const res = await request(app)
      .post("/roles")
      .send({
        code: "TEST001",
      });

    console.log(res.body);

    expect(res.statusCode).toBe(400);

    expect(res.body.success).toBe(false);
  });

  // TC03
  test("TC03 - Missing code", async () => {

    const res = await request(app)
      .post("/roles")
      .send({
        name: "Test Role",
      });

    console.log(res.body);

    expect(res.statusCode).toBe(400);

    expect(res.body.success).toBe(false);
  });

  // TC04
  test("TC04 - Empty request body", async () => {

    const res = await request(app)
      .post("/roles")
      .send({});

    console.log(res.body);

    expect(res.statusCode).toBe(400);

    expect(res.body.success).toBe(false);
  });

  // TC05
  test("TC05 - Duplicate role code", async () => {

    const duplicateCode = `DUP_ROLE_${Date.now()}`;

    // FIRST INSERT
    await request(app)
      .post("/roles")
      .send({
        name: "Role 1",
        code: duplicateCode,
      });

    // DUPLICATE INSERT
    const res = await request(app)
      .post("/roles")
      .send({
        name: "Role 2",
        code: duplicateCode,
      });

    console.log(res.body);

    expect(res.statusCode).toBe(409);

    expect(res.body.success).toBe(false);
  });

  // TC06 + TC07
  test("TC06/TC07 - Get all roles", async () => {

    const res = await request(app)
      .get("/roles");

    console.log(res.body);

    expect(res.statusCode).toBe(200);

    expect(res.body.success).toBe(true);

    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // TC08
  test("TC08 - Database empty handling", async () => {

    const res = await request(app)
      .get("/roles");

    console.log(res.body);

    expect(res.statusCode).toBe(200);

    expect(res.body.success).toBe(true);

    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // TC09
  test("TC09 - DB failure simulation", async () => {

    jest
      .spyOn(pool, "query")
      .mockRejectedValueOnce(new Error("DB Failed"));

    const res = await request(app)
      .get("/roles");

    console.log(res.body);

    expect(res.statusCode).toBe(500);

    expect(res.body.success).toBe(false);
  });

});

