import * as request from "supertest";

const email = "tse@csgames.com";
const password = "password1234";

export async function getValidUser(app) {
  const createAccountEndpoint = "/api/auth/createAccount";
  const fullName = "CS GAMES";
  return await request(app).post(createAccountEndpoint).send({ fullName, email, password });
}

export async function getValidToken(app) {
  const authenticateEndpoint = "/api/auth/authenticate";
  return await request(app).post(authenticateEndpoint).send({ email, password });
}
