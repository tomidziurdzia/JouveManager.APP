import { Role } from "./roles.interface";

export interface LoginUser {
  email: string;
  password: string;
}

export interface Session {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  avatarUrl: string;
  token: string;
  roles: Role[];
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  roles: Role[];
}
