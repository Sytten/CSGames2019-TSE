export class Account {
  constructor(
    public userId: string,
    public email: string,
    public passwordHash: string,
    public passwordSalt: string,
    public fullName: string,
    ) { }
}
