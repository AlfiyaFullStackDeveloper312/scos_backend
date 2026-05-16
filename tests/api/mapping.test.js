const request = require("supertest");

const app = require("../../src/app");

const pool = require("../../src/config/database");

describe("Mapping APIs", () => {
  // TC01
  test("TC01 - Create mapping with valid data", async () => {
    // CLEANUP OLD TEST DATA

    await pool.query(`

      DELETE FROM user_institute_roles

      WHERE user_id = 3

      AND institute_id = 2

      AND role_id = 2

    `);

    const res = await request(app)
      .post("/user-institute-roles")

      .send({
        tenant_id: 1,

        user_id: 3,

        institute_id: 2,

        role_id: 2,

        is_primary: true,
      });

    console.log(res.body);

    expect(res.statusCode).toBe(200);

    expect(res.body.success).toBe(true);

    expect(res.body.data).toBeDefined();
  });

  // TC02
  test("TC02 - Missing user_id", async () => {
    const res = await request(app).post("/user-institute-roles").send({
      tenant_id: 1,
      institute_id: 1,
      role_id: 1,
      is_primary: true,
    });

    console.log(res.body);

    expect(res.statusCode).toBe(400);

    expect(res.body.success).toBe(false);
  });

  // TC03
  test("TC03 - Missing institute_id", async () => {
    const res = await request(app).post("/user-institute-roles").send({
      tenant_id: 1,
      user_id: 1,
      role_id: 1,
      is_primary: true,
    });

    console.log(res.body);

    expect(res.statusCode).toBe(400);

    expect(res.body.success).toBe(false);
  });

  // TC04
  test("TC04 - Missing role_id", async () => {
    const res = await request(app).post("/user-institute-roles").send({
      tenant_id: 1,
      user_id: 1,
      institute_id: 1,
      is_primary: true,
    });

    console.log(res.body);

    expect(res.statusCode).toBe(400);

    expect(res.body.success).toBe(false);
  });

  // TC05
  test("TC05 - Invalid user_id", async () => {
    const res = await request(app).post("/user-institute-roles").send({
      tenant_id: 1,
      user_id: 999999,
      institute_id: 1,
      role_id: 1,
      is_primary: true,
    });

    console.log(res.body);

    expect(res.statusCode).toBe(404);

    expect(res.body.success).toBe(false);
  });

  // TC06
  test("TC06 - Invalid institute_id", async () => {
    const res = await request(app).post("/user-institute-roles").send({
      tenant_id: 1,
      user_id: 1,
      institute_id: 999999,
      role_id: 1,
      is_primary: true,
    });

    console.log(res.body);

    expect(res.statusCode).toBe(404);

    expect(res.body.success).toBe(false);
  });

  // TC07
  test("TC07 - Invalid role_id", async () => {
    const res = await request(app).post("/user-institute-roles").send({
      tenant_id: 1,
      user_id: 1,
      institute_id: 1,
      role_id: 999999,
      is_primary: true,
    });

    console.log(res.body);

    expect(res.statusCode).toBe(404);

    expect(res.body.success).toBe(false);
  });

  // TC08
  test("TC08 - Empty request body", async () => {
    const res = await request(app).post("/user-institute-roles").send({});

    console.log(res.body);

    expect(res.statusCode).toBe(400);

    expect(res.body.success).toBe(false);
  });

  // TC09
  test("TC09 - Duplicate mapping", async () => {
    const body = {
      tenant_id: 1,
      user_id: 2,
      institute_id: 2,
      role_id: 2,
      is_primary: true,
    };

    // FIRST INSERT
    await request(app).post("/user-institute-roles").send(body);

    // DUPLICATE INSERT
    const res = await request(app).post("/user-institute-roles").send(body);

    console.log(res.body);

    expect(res.statusCode).toBe(409);

    expect(res.body.success).toBe(false);
  });
  // TC11 + TC12
  test("TC11/TC12 - Get mappings", async () => {
    const res = await request(app).get("/user-institute-roles");

    console.log(res.body);

    expect(res.statusCode).toBe(200);

    expect(res.body.success).toBe(true);

    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // TC13
  test("TC13 - Database empty handling", async () => {
    const res = await request(app).get("/user-institute-roles");

    console.log(res.body);

    expect(res.statusCode).toBe(200);

    expect(res.body.success).toBe(true);
  });

  // TC14
  test("TC14 - DB error simulation", async () => {
    jest.spyOn(pool, "query").mockRejectedValueOnce(new Error("DB Failed"));

    const res = await request(app).get("/user-institute-roles");

    console.log(res.body);

    expect(res.statusCode).toBe(500);

    expect(res.body.success).toBe(false);
  });
});
