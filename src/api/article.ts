import { Request, Response } from "express";
import * as ArticleSchema from "../schemas/article.schema";
import { Document } from "mongoose";
import { Article } from "../models/article.model";

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
  const title = req.body.title;
  const subtitle = req.body.subtitle;
  const leadParagraph = req.body.leadParagraph;
  const imageUrl = req.body.imageUrl;
  const body = req.body.body;
  const category = req.body.category;

  const userId = res.locals.user.userId;
  const author = res.locals.user.fullName;

  const date = Date.now();

  const article = await ArticleSchema.default.create({
    title,
    subtitle,
    leadParagraph,
    imageUrl,
    body,
    category,
    userId,
    author,
    date,
  });

  res.send({ message: "Success", id: article.id });
};
