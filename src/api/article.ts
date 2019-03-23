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
