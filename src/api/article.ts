import { Request, Response } from "express";
import * as ArticleSchema from "../schemas/article.schema";
import { Document } from "mongoose";
import { Article } from "../models/article.model";

export let getAll = async (req: Request, res: Response) => {
  const articlesDocs: Document[] = await ArticleSchema.default.find();
  const articles = articlesDocs.map((doc: Document) => Article.fromDocument(doc));
  res.send(articles.map((article: Article) => JSON.stringify(article)));
};
