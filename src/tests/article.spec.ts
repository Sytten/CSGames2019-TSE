import * as request from "supertest";
import * as mongoose from "mongoose";
import MongoMemoryServer from "mongodb-memory-server";
import { expect } from 'chai';
import app from "../app";
import * as helpers from './helpers';

describe("Test article API", () => {
  const articlesEndpoint = "/api/articles";
  const articleEndpoint = "/api/article";
  const article = {
    title : "An apple",
    subtitle : "An apple's subtitle",
    leadParagraph : "An apple's lead paragraph",
    imageUrl : "https://i5.walmartimages.ca/images/Large/428/5_r/6000195494285_R.jpg",
    body : "An apple's body",
    category : "An apple's category",
  };
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
    describe("with many articles", async () => {
      await helpers.getValidUser(app);
      const token = await helpers.getValidToken(app);

      await helpers.createArticle(app, token);
      await helpers.createArticle(app, token);

      return request(app)
          .get(articlesEndpoint)
          .send()
          .expect(200)
          .then((response) => {
            expect(response.body).to.have.length(2);
          });
    });
  });

  describe("POST /articles", () => {
    describe("with all parameters", () => {
      it("should return 200 OK", async () => {
        await helpers.getValidUser(app);
        const token = await helpers.getValidToken(app);
        return request(app)
          .post(articlesEndpoint)
          .set(`Authorization`, `Bearer ${token}`)
          .send(article)
          .expect(200)
          .then((response) => {
            expect(response.body.message).to.equal("Success");
            expect(response.body.id).to.be.a("string");
          });
      });
    });
    describe("with missing parameters", () => {
      it("should return 400 BAD REQUEST", async () => {
        await helpers.getValidUser(app);
        const token = await helpers.getValidToken(app);
        return request(app)
          .post(articlesEndpoint)
          .set(`Authorization`, `Bearer ${token}`)
          .send({ title: "some title " })
          .expect(400);
      });
    });
  });

  describe("GET /article/:id", () => {
    describe("with invalid id", () => {
      it("should return 400 BAD REQUEST", () => {
        return request(app)
          .get(`${articleEndpoint}/5c967d4fc1cf6727b09f5231`)
          .send()
          .expect(404);
      });
    }),
    describe("with valid id", async () => {
      await helpers.getValidUser(app);
      const token = await helpers.getValidToken(app);
      const article = await helpers.createArticle(app, token);
      return request(app)
          .get(`${articleEndpoint}/${article.id}`)
          .send()
          .expect(200)
          .then((response) => {
            expect(response.body.id).to.equal(article.id)
          });
    });
  });
});
