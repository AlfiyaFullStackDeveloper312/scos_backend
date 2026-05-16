const request = require("supertest");
const app = require("../../src/app");

const tokens = require("../helpers/tokens");

describe("AUTH APIs", () => {

  // LOGIN
  test("TC01 - Login with valid credentials", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "ava@scos.com",
        password: "123456",
      });
    console.log(res.body);
    expect(res.body.success).toBe(true);
    expect(res.body.pre_context_token).toBeDefined();

    tokens.preContextToken = res.body.pre_context_token;
  });
  // GET INSTITUTES + ROLES
  test("TC02 - Get institutes and roles", async () => {
    const res = await request(app)
      .get("/auth/my-institutes-roles")
      .set(
        "Authorization",
        `Bearer ${tokens.preContextToken}`
      );

    console.log(res.body);

    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
  // SELECT CONTEXT
  test("TC03 - Select Context", async () => {
    const res = await request(app)
      .post("/auth/select-context")
      .set(
        "Authorization",
        `Bearer ${tokens.preContextToken}`
      )
      .send({
        tenant_id: 1,
        institute_id: 1,
        role_id: 1,
      });

    console.log(res.body);

    expect(res.body.success).toBe(true);
    expect(res.body.access_token).toBeDefined();

    tokens.accessToken = res.body.access_token;
  });
  // GET ME
  test("TC04 - Get Current User", async () => {
    const res = await request(app)
      .get("/auth/me")
      .set(
        "Authorization",
        `Bearer ${tokens.accessToken}`
      );

    console.log(res.body);

    expect(res.body.success).toBe(true);
    expect(res.body.user).toBeDefined();
  });

});