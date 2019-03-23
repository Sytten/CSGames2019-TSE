import * as request from "supertest";
import * as chai from 'chai';
import app from "../app";

const expect = chai.expect;

describe("GET /status", () => {
  it("should return 200 OK", () => {
    return request(app)
      .get("/api/status")
      .expect(200, { status: "Up" });
  });
});
