import NextAuth from 'next-auth';
import { NEXT_PUBLIC_API_URL } from '../../../../environment/env';
import CredentialsProvider from 'next-auth/providers/credentials';
import { user } from '@heroui/react';

export default NextAuth({
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const result = await res.json();
        if(!res.ok){
          throw new Error(result.message)
        }
        const user = result.data;

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          name: token.name,
          email: token.email,
          role: token.role,
        },
      };
    },
  },
});
