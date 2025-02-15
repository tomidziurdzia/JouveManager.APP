import { Role } from "./roles.interface";

export interface LoginUser {
  email: string;
  password: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  avatarUrl: string;
  token: string;
  roles: Role[];
}
