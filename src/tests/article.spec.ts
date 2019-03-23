import * as request from "supertest";
import * as mongoose from "mongoose";
import MongoMemoryServer from "mongodb-memory-server";
import { expect } from 'chai';
import app from "../app";
import * as helpers from './helpers';

describe("Test article API", () => {
  const articlesEndpoint = "/api/articles";
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

  describe("GET /articles", () => {
    describe("with no articles", () => {
      it("should return 200 OK", () => {
        return request(app)
          .get(articlesEndpoint)
          .send()
          .expect(200, []);
      });
    }),
    describe("with many articles", () => {

    });
  });

  describe("POST /articles", () => {
    describe("with all parameters", () => {
      it("should return 200 OK", () => {
        return request(app)
          .get(articlesEndpoint)
          .send()
          .expect(200, []);
      });
    });
  });
});
