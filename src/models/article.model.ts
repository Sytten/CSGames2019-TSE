import { Document } from "mongoose";

export class Article {
  constructor(
    public id: string,
    public title: string,
    public subtitle: string,
    public leadParagraph: string,
    public imageUrl: string,
    public body: string,
    public author: string,
    public userId: string,
    public date: Date,
    public category: string,
    ) { }

  static fromDocument(doc: Document): Article {
    return new Article(
      doc.id,
      doc.get("title"),
      doc.get("subtitle"),
      doc.get("leadParagraph"),
      doc.get("imageUrl"),
      doc.get("body"),
      doc.get("author"),
      doc.get("userId"),
      doc.get("date"),
      doc.get("category"),
    );
  }
}
