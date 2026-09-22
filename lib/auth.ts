import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { runQuery } from "@/lib/neo4j";
import type { UserRole } from "@/types/auth";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        // Try querying user from Neo4j if configured
        try {
          const users = await runQuery<{
            id: string;
            name: string;
            email: string;
            role: UserRole;
            department: string;
            photoUrl: string;
            passwordHash: string;
          }>(
            `MATCH (u:User {email: $email}) 
             RETURN u.id AS id, u.name AS name, u.email AS email,
                    u.role AS role, u.department AS department,
                    u.photoUrl AS photoUrl, u.passwordHash AS passwordHash`,
            { email }
          );

          if (users.length > 0) {
            const user = users[0];
            const { createHash } = await import("crypto");
            const inputHash = createHash("sha256").update(password).digest("hex");

            if (inputHash === user.passwordHash || password === user.passwordHash) {
              return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department,
                photoUrl: user.photoUrl,
              };
            }
          }
        } catch {
          // Neo4j not reachable, check demo users fallback below
        }

        // Demo user fallback
        const { DEMO_USERS } = await import("@/lib/data-store");
        const demoUser = DEMO_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (demoUser && (password === demoUser.passwordHash || password === "demo123")) {
          return {
            id: demoUser.id,
            name: demoUser.name,
            email: demoUser.email,
            role: demoUser.role,
            department: demoUser.department,
            photoUrl: `https://api.dicebear.com/9.x/avataaars/svg?seed=${demoUser.id}`,
          };
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role: UserRole }).role;
        token.department = (user as { department?: string }).department;
        token.photoUrl = (user as { photoUrl?: string }).photoUrl;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
        session.user.department = token.department as string | undefined;
        session.user.photoUrl = token.photoUrl as string | undefined;
      }
      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },

  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours
  },
});
