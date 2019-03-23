import * as request from "supertest";
import chai = require("chai");
import app from "../app";

const expect = chai.expect;

describe("GET /status", () => {
  it("should return 200 OK", () => {
    return request(app)
      .get("/api/status")
      .expect(200, { status: "Up" });
  });
});
