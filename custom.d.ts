declare module Express {
  export interface Request {
    user?: {
      name: string;
      email: string;
      _id: string;
    };
  }
}
