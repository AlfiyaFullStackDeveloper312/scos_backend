const request = require("supertest");
const app = require("../../src/app");

describe("SECURITY APIs", () => {

  // SQL Injection Test
  test("TC01 - SQL Injection should fail", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "' OR 1=1 --",
        password: "' OR 1=1 --",
      });

    console.log(res.body);

    expect(res.statusCode).not.toBe(200);

    expect(res.body.success).toBe(false);
  });

  // XSS Payload Test
  test("TC02 - XSS payload should fail", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        first_name: "<script>alert('xss')</script>",
        last_name: "Test",
        email: "xss@test.com",
        password: "Password123",
        mobile: "9999999999",
      });

    console.log(res.body);

    expect(res.body.success).toBe(false);
  });

  // Missing Authorization Header
  test("TC03 - Access protected API without token", async () => {
    const res = await request(app)
      .get("/auth/me");

    console.log(res.body);

    expect(res.statusCode).toBe(401);

    expect(res.body.success).toBe(false);
  });

  // Invalid JWT Token
  test("TC04 - Access protected API with invalid token", async () => {
    const res = await request(app)
      .get("/auth/me")
      .set("Authorization", "Bearer invalid_token");

    console.log(res.body);

    expect(res.statusCode).toBe(401);

    expect(res.body.success).toBe(false);
  });

  // Empty Request Body
  test("TC05 - Empty request body validation", async () => {
    const res = await request(app)
      .post("/users")
      .send({});

    console.log(res.body);

    expect(res.body.success).toBe(false);
  });

  // Invalid Email Format
  test("TC06 - Invalid email format should fail", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        first_name: "Test",
        last_name: "User",
        email: "invalid-email",
        password: "Password123",
        mobile: "9999999999",
      });

    console.log(res.body);

    expect(res.body.success).toBe(false);
  });

  // Weak Password Test
  test("TC07 - Weak password should fail", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        first_name: "Weak",
        last_name: "Password",
        email: "weak@test.com",
        password: "123",
        mobile: "9999999999",
      });

    console.log(res.body);

    expect(res.body.success).toBe(false);
  });

  // Huge Payload Test
  test("TC08 - Huge payload should fail", async () => {
    const largeText = "A".repeat(10000);

    const res = await request(app)
      .post("/users")
      .send({
        first_name: largeText,
        last_name: largeText,
        email: "huge@test.com",
        password: "Password123",
        mobile: "9999999999",
      });

    console.log(res.body);

    expect(res.body.success).toBe(false);
  });

});