const request = require("supertest");

const app = require("../../src/app");

const pool = require("../../src/config/database");

describe("Institute APIs", () => {

  // TC01
  test("TC01 - Create Institute with valid data", async () => {

    const res = await request(app)
      .post("/institutes")
      .send({
        tenant_id: 1,
        name: "Automation Institute",
        code: `AUTO_${Date.now()}`,
        type: "School",
        inst_location: "Nagpur",
        inst_logo: "logo.png",
      });

    console.log(res.body);

    expect(res.statusCode).toBe(200);

    expect(res.body.success).toBe(true);

    expect(res.body.data).toBeDefined();
  });

  // TC02
  test("TC02 - Missing name", async () => {

    const res = await request(app)
      .post("/institutes")
      .send({
        tenant_id: 1,
        code: "TEST001",
      });

    console.log(res.body);

    expect(res.statusCode).toBe(400);

    expect(res.body.success).toBe(false);
  });

  // TC03
  test("TC03 - Invalid tenant_id", async () => {

    const res = await request(app)
      .post("/institutes")
      .send({
        tenant_id: 999999,
        name: "Test",
        code: `INVALID_${Date.now()}`,
      });

    console.log(res.body);

    expect(res.statusCode).toBe(404);

    expect(res.body.success).toBe(false);
  });

  // TC04
  test("TC04 - Empty request body", async () => {

    const res = await request(app)
      .post("/institutes")
      .send({});

    console.log(res.body);

    expect(res.statusCode).toBe(400);

    expect(res.body.success).toBe(false);
  });

  // TC05
  test("TC05 - Duplicate institute code", async () => {

    const duplicateCode = `DUP_${Date.now()}`;

    // FIRST INSERT
    await request(app)
      .post("/institutes")
      .send({
        tenant_id: 1,
        name: "Institute 1",
        code: duplicateCode,
      });

    // DUPLICATE INSERT
    const res = await request(app)
      .post("/institutes")
      .send({
        tenant_id: 1,
        name: "Institute 2",
        code: duplicateCode,
      });

    console.log(res.body);

    expect(res.statusCode).toBe(409);

    expect(res.body.success).toBe(false);
  });

  // TC06 + TC07
  test("TC06/TC07 - Get all institutes", async () => {

    const res = await request(app)
      .get("/institutes");

    console.log(res.body);

    expect(res.statusCode).toBe(200);

    expect(res.body.success).toBe(true);

    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // TC08
  test("TC08 - Database empty handling", async () => {

    const res = await request(app)
      .get("/institutes");

    console.log(res.body);

    expect(res.statusCode).toBe(200);

    expect(res.body.success).toBe(true);

    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // TC09
  test("TC09 - DB error simulation", async () => {

    // TEMPORARILY BREAK QUERY
    jest
      .spyOn(pool, "query")
      .mockRejectedValueOnce(new Error("DB Failed"));

    const res = await request(app)
      .get("/institutes");

    console.log(res.body);

    expect(res.statusCode).toBe(500);

    expect(res.body.success).toBe(false);
  });

});
