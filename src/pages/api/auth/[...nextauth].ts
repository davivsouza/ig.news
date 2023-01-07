import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { fauna } from "../../../services/fauna";
import { query as q } from "faunadb";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: {
          scope: "read:user",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      try {
        const { email } = user;
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                //match na condição abaixo
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email!)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              {data: { email }}
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email!)
              )
            )
          )
        );
        return true;
      } catch {
        return false;
      }
    },
  },
});
