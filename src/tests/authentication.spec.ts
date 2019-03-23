import * as request from "supertest";
import * as mongoose from "mongoose";
import MongoMemoryServer from "mongodb-memory-server";
import { expect } from 'chai';
import app from "../app";

describe("Test authentication", () => {
  const fullName = "CS GAMES";
  const email = "tse@csgames.com";
  const password = "password1234";
  const createAccountEndpoint = "/api/auth/createAccount";
  const authenticateEndpoint = "/api/auth/authenticate";
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

  describe("POST /createAccount", () => {
    describe("with all parameters", () => {
      describe("with unregistered email", () => {
        it("should return 201 CREATED", () => {
          return request(app)
            .post(createAccountEndpoint)
            .send({ fullName, email, password })
            .expect(201);
        });
      }),

      describe("with registered email", () => {
        it("should return 500 INTERNAL SERVER ERROR", async () => {
          await request(app).post(createAccountEndpoint).send({ fullName, email, password }).expect(201);

          return request(app)
            .post(createAccountEndpoint)
            .send({ fullName, email, password })
            .expect(500);
        });
      });
    }),

    describe("with missing parameter", () => {
      describe("with missing full name", () => {
        it("should return 400 BAD REQUEST", () => {
          return request(app)
            .post(createAccountEndpoint)
            .send({ email, password })
            .expect(400);
        });
      }),
      describe("with missing email", () => {
        it("should return 400 BAD REQUEST", () => {
          return request(app)
            .post(createAccountEndpoint)
            .send({ fullName, password })
            .expect(400);
        });
      }),
      describe("with missing password", () => {
        it("should return 400 BAD REQUEST", () => {
          return request(app).post(createAccountEndpoint).send({ fullName, email }).expect(400);
        });
      });
    });
  });

  describe("POST /login", () => {
    describe("with all parameters", () => {
      describe("with registered user", () => {
        it("should return 200 OK with token", async () => {
          await request(app).post(createAccountEndpoint).send({ fullName, email, password }).expect(201);

          return request(app)
            .post(authenticateEndpoint)
            .send({ email, password })
            .expect(200)
            .then(response => {
              expect(response.body.accessToken).to.be.a('string');
            });
        });
      }),
      describe("with unregistred user", () => {
        it("should return 403 FORBIDDEN", async () => {
          return request(app)
            .post(authenticateEndpoint)
            .send({ email, password })
            .expect(403);
        });
      })
    }),

    describe("with missing parameter", () => {
      describe("with missing email", () => {
        it("should return 404 BAD REQUEST", async () => {
          await request(app).post(createAccountEndpoint).send({ fullName, email, password }).expect(201);

          return request(app)
            .post(authenticateEndpoint)
            .send({ password })
            .expect(400);
        });
      }),
      describe("with missing password", () => {
        it("should return 404 BAD REQUEST", async () => {
          await request(app).post(createAccountEndpoint).send({ fullName, email, password }).expect(201);

          return request(app)
            .post(authenticateEndpoint)
            .send({ email })
            .expect(400);
        });
      });
    });
  });
});
