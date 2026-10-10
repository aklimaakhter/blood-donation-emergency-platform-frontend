export type Role = "ADMIN" | "USER" | "DONOR";

export const ROLE_HOME: Record<Role, string> = {
  ADMIN: "/admin",
  USER: "/user",
  DONOR: "/donor",
};

export interface JwtUser {
  userId: string;
  name: string;
  email: string;
  role: Role;
}

export interface ActionState {
  success: boolean;
  message: string;
}