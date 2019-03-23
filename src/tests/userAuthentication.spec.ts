import * as request from "supertest";
import * as mongoose from "mongoose";
import MongoMemoryServer from "mongodb-memory-server";
import { expect } from "chai";
import app from "../app";
import * as helpers from "./helpers";

describe("Test authentication of user", () => {
  const userIdEndpoint = "/api/auth/userid";
  let mongoServer;

  before(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getConnectionString();
    await mongoose.connect(mongoUri, (err) => {
      if (err) console.error(err);
    });
  });

  after(async () => {
    mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  describe("GET /userid", () => {
    describe("with valid token", () => {
      it("should return 200 OK", async () => {
        await helpers.getValidUser(app);
        const token = await helpers.getValidToken(app);
        return request(app)
          .get(userIdEndpoint)
          .set(`Authorization`, `Bearer ${token}`)
          .send()
          .expect(200)
          .then((response) => {
            expect(response.body.id).to.be.a("string");
          });
      });
    }),
    describe("with invalid token", () => {
      it("should return 403 FORBIDDEN", () => {
        return request(app)
          .get(userIdEndpoint)
          .set(`Authorization`, `Bearer sdsada`)
          .send()
          .expect(403);
      });
    }),
    describe("without token", () => {
      it("should return 403 FORBIDDEN", () => {
        return request(app)
          .get(userIdEndpoint)
          .send()
          .expect(403);
      });
    });
  });
});
