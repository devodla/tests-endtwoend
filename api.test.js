import { deepStrictEqual, strictEqual } from "node:assert";
import { after, before, describe, it } from "node:test";

const BASE_URL = "http://localhost:3000";

describe("API Workflow", () => {
  let _server = {};
  before(async () => {
    _server = (await import("./api.js")).app;
    await new Promise((resolve) => _server.once("listening", resolve));
  });
  after((done) => _server.close(done));
  it("should receive not authorized given wrong user and password", async () => {
    const data = {
      user: "reynaldo",
      password: "",
    };
    const request = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    strictEqual(request.status, 401);
    const response = await request.json();
    deepStrictEqual(response, { error: "user invalid!" });
  });
});
