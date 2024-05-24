import NextAuth from "next-auth"
import {type JWT} from "next-auth/jwt"
import {PrismaAdapter} from "@auth/prisma-adapter"

import {db} from "@/lib/db"
import {getUserById} from "@/data/user/user"

import authConfig from "./auth.config"

export const {handlers, auth, signIn, signOut} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  callbacks: {
    async signIn({user, account}) {
      //allow Oauth without  email verification

      if (account?.provider !== "credentials") {
        return true
      }

      if (!user.id) return false

      /* const existingUser = await getUserById(user.id);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      // TODO: Add 2FA Check */

      return true
    },
    async session({session, token}) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }

      /* if (token.role && session.user) {
        session.user.role = token.role;
      } */

      return session
    },
    async jwt({token}: {token: JWT}) {
      if (!token.sub) return token
      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      /* token.role = existingUser.role; */

      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: {strategy: "jwt"},
  ...authConfig,
})
