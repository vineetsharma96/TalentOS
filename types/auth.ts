export type UserRole = "ADMIN" | "HR_MANAGER" | "EMPLOYEE";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  photoUrl?: string;
}

declare module "next-auth" {
  interface Session {
    user: SessionUser;
  }
  interface User extends SessionUser {}
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
    id: string;
    department?: string;
    photoUrl?: string;
  }
}
