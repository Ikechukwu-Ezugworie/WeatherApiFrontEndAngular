export class LoginResponse<T> {
  token: string;
  loggedInUser: T;
}
