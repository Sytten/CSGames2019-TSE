import { Request, Response } from "express";
import * as ArticleSchema from "../schemas/article.schema";
import { Document } from "mongoose";
import { Article } from "../models/article.model";
import Account from "../schemas/account.schema";

export let getAll = async (req: Request, res: Response) => {
  const articlesDocs: Document[] = await ArticleSchema.default.find();
  const articles = articlesDocs.map((doc: Document) => Article.fromDocument(doc));
  res.send(articles);
};

export let get = async (req: Request, res: Response) => {
  const articleId: string = req.params.ARTICLE_ID;
  const articleDoc: Document = await ArticleSchema.default.findOne({ _id: articleId });

  if (articleDoc === null) {
    res.status(404).send("Article not found");
    return;
  }

  res.send(JSON.stringify(Article.fromDocument(articleDoc)));
};

export let getForUser = async (req: Request, res: Response) => {
  const userId: string = req.params.USER_ID;
  const articleDocs: Document[] = await ArticleSchema.default.find({ userId });
  const articles = articleDocs.map((doc: Document) => Article.fromDocument(doc));
  res.send(articles);
};

export let create = async (req: Request, res: Response) => {
  const email = res.locals.user.email;
  const author = res.locals.user.fullName;

  const accountDoc: Document = await Account.findOne({ email });

  try {
    const article = await ArticleSchema.default.create({
      ...req.body,
      author,
      userId: accountDoc.id,
    });
    res.send({ message: "Success", id: article.id });
  } catch {
    res.status(400).send();
  }
};

export let update = async (req: Request, res: Response) => {
  const articleId = req.body.id;
  const requestUserId = req.body.userId;

  const requestBody = req.body;
  delete requestBody.id;
  delete requestBody.userId;

  const email = res.locals.user.email;

  const articleDoc: Document = await ArticleSchema.default.findOne({ id: articleId });
  if (articleDoc === null) {
    res.status(404).send();
    return;
  }

  const accountDoc: Document = await Account.findOne({ email });
  if (requestUserId !== accountDoc.id) {
    res.status(401).send();
    return;
  }

  try {
    await articleDoc.updateOne({
      ...requestBody,
      date: Date.now(),
    });
  } catch {
    res.status(400).send();
    return;
  }

  res.send({ message: "Success" });
};

export let remove = async (req: Request, res: Response) => {
  const articleId = req.params.ARTICLE_ID;

  const email = res.locals.user.email;

  const articleDoc: Document = await ArticleSchema.default.findById(articleId);
  if (articleDoc === null) {
    res.status(404).send();
    return;
  }

  const accountDoc: Document = await Account.findOne({ email });
  const tokenUserId = accountDoc.id;
  const authorId = articleDoc.get("userId").toString();
  if (tokenUserId !== authorId) {
    res.status(401).send();
    return;
  }

  await ArticleSchema.default.deleteOne({ _id: articleDoc.id });

  res.send({ message: "Article succesfully deleted." });
};
