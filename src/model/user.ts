export class User {
  _id: string;
  login: string;
  password: string;
  role: string;
  email: string;
  logo: string;
  votedFor: Array<any>;
  cart: Array<any>;
}