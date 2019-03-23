import * as request from 'supertest';
import * as chai from 'chai';
import app from '../app';
import { create } from 'domain';

const expect = chai.expect;

const createAccountEndpoint = "/api/auth/createAccount";

const fullName = "CS GAMES";
const email = "tse@csgames.com";
const password = "password1234";

describe("POST /createAccount", () => {
    describe("with all parameters", () => {
        describe("with unregistered email", () => {
            it("should return 201 CREATED", () => {
                return request(app).post(createAccountEndpoint).send({ fullName, email, password }).expect(201);
            })
        }),

        describe("with registered email", () => {
            it("should return 500 INTERNAL SERVER ERROR", () => {
                // TODO: Mock an account and try to create one with the same email
                return request(app).post(createAccountEndpoint).send({ fullName, email, password }).expect(500);
            })
        })
    }),

    describe("with missing parameter", () => {
        describe("with missing full name", () => {
            it("should return 400 BAD REQUEST", () => {
                return request(app).post(createAccountEndpoint).send({ email, password }).expect(400);
            })
        }),
        describe("with missing email", () => {
            it("should return 400 BAD REQUEST", () => {
                return request(app).post(createAccountEndpoint).send({ fullName, password }).expect(400);
            })
        }),
        describe("with missing password", () => {
            it("should return 400 BAD REQUEST", () => {
                return request(app).post(createAccountEndpoint).send({ fullName, email }).expect(400);
            })
        })
    })
})

