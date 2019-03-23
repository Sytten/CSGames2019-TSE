export class Article {
  constructor(
    public id?: string,
    public title?: string,
    public subtitle?: string,
    public leadParagraph?: string,
    public imageUrl?: string,
    public body?: string,
    public author?: string,
    public userId?: string,
    public date?: Date,
    public category?: string,
    ) { }
}
