import { Request, Response } from "express";
import ArticleSchema from "../schemas/article.schema";
import AccountSchema from "../schemas/account.schema";
import { Document } from "mongoose";
import { Article } from "../models/article.model";

export const getAll = async (req: Request, res: Response) => {
  const articlesDocs: Document[] = await ArticleSchema.find();
  const articles: Article[] = articlesDocs.map((doc: Document) => Article.fromDocument(doc));
  res.send(articles);
};

export const get = async (req: Request, res: Response) => {
  const articleId: string = req.params.ARTICLE_ID;
  const articleDoc: Document = await ArticleSchema.findOne({ _id: articleId });

  if (articleDoc === null) {
    res.status(404).send("Article not found");
    return;
  }

  res.send(Article.fromDocument(articleDoc));
};

export const getForUser = async (req: Request, res: Response) => {
  const userId: string = req.params.USER_ID;
  const articleDocs: Document[] = await ArticleSchema.find({ userId });
  const articles: Article[] = articleDocs.map((doc: Document) => Article.fromDocument(doc));
  res.send(articles);
};

export const create = async (req: Request, res: Response) => {
  const email: string = res.locals.user.email;
  const author: string = res.locals.user.fullName;

  const accountDoc: Document = await AccountSchema.findOne({ email });

  try {
    const article = await ArticleSchema.create({
      ...req.body,
      author,
      userId: accountDoc.id,
    });
    res.send({ message: "Success", id: article.id });
  } catch {
    res.status(400).send();
  }
};

export const update = async (req: Request, res: Response) => {
  const articleId: string = req.body.id;
  const requestUserId: string = req.body.userId;

  const requestBody = req.body;
  delete requestBody.id;
  delete requestBody.userId;

  const email: string = res.locals.user.email;

  if (requestBody.body === undefined
    || requestBody.title === undefined
    || requestBody.subtitle === undefined
    || requestBody.leadParagraph === undefined) {
    res.status(400).send();
  }

  const articleDoc: Document = await ArticleSchema.findById(articleId);
  if (articleDoc === null) {
    res.status(404).send();
    return;
  }

  const accountDoc: Document = await AccountSchema.findOne({ email });
  if (requestUserId !== accountDoc.id) {
    res.status(401).send();
    return;
  }

  await articleDoc.updateOne(
    {
      ...requestBody, date: Date.now(),
    });

  res.send({ message: "Success" });
};

export const remove = async (req: Request, res: Response) => {
  const articleId: string = req.params.ARTICLE_ID;

  const email: string = res.locals.user.email;

  const articleDoc: Document = await ArticleSchema.findById(articleId);
  if (articleDoc === null) {
    res.status(404).send();
    return;
  }

  const accountDoc: Document = await AccountSchema.findOne({ email });
  const tokenUserId: string = accountDoc.id;
  const authorId: string = articleDoc.get("userId").toString();
  if (tokenUserId !== authorId) {
    res.status(401).send();
    return;
  }

  await ArticleSchema.deleteOne({ _id: articleDoc.id });

  res.send({ message: "Article succesfully deleted." });
};
