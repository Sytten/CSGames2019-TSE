import * as request from "supertest";

const email = "tse@csgames.com";
const password = "password1234";

export async function getValidUser(app) {
  const createAccountEndpoint = "/api/auth/createAccount";
  const fullName = "CS GAMES";
  return await request(app)
    .post(createAccountEndpoint)
    .send({ fullName, email, password })
    .expect(201);
}

export async function getValidToken(app) {
  const authenticateEndpoint = "/api/auth/authenticate";
  return await request(app)
    .post(authenticateEndpoint)
    .send({ email, password })
    .expect(200)
    .then((response) => {
      return response.body.accessToken;
    });
}

export async function createArticle(app, token) {
  const article = {
    title : "An apple",
    subtitle : "An apple's subtitle",
    leadParagraph : "An apple's lead paragraph",
    imageUrl : "https://i5.walmartimages.ca/images/Large/428/5_r/6000195494285_R.jpg",
    body : "An apple's body",
    category : "An apple's category",
  };
  const articlesEndpoint = "/api/articles";
  return await request(app)
    .post(articlesEndpoint)
    .set(`Authorization`, `Bearer ${token}`)
    .send(article)
    .expect(200)
    .then((response) => {
      return response.body;
    });
}
