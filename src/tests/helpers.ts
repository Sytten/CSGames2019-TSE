import * as request from "supertest";

const email = "tse@csgames.com";
const password = "password1234";
const articlesEndpoint = "/api/articles";

export const getValidUser = async (app, userEmail=email) => {
  const createAccountEndpoint = "/api/auth/createAccount";
  const fullName = "CS GAMES";
  return await request(app)
    .post(createAccountEndpoint)
    .send({ fullName, password, email: userEmail })
    .expect(201);
};

export const getValidToken = async (app, userEmail=email) => {
  const authenticateEndpoint = "/api/auth/authenticate";
  return await request(app)
    .post(authenticateEndpoint)
    .send({ password, email: userEmail })
    .expect(200)
    .then((response) => {
      return response.body.accessToken;
    });
};

export const createArticle = async (app, token) => {
  const article = {
    title : "An apple",
    subtitle : "An apple's subtitle",
    leadParagraph : "An apple's lead paragraph",
    imageUrl : "https://i5.walmartimages.ca/images/Large/428/5_r/6000195494285_R.jpg",
    body : "An apple's body",
    category : "An apple's category",
  };
  return await request(app)
    .post(articlesEndpoint)
    .set(`Authorization`, `Bearer ${token}`)
    .send(article)
    .expect(200)
    .then((response) => {
      return response.body;
    });
};

export const getAllArticles = async (app) => {
  return request(app)
    .get(articlesEndpoint)
    .send()
    .expect(200)
    .then((response) => {
      return response.body;
    });
};
