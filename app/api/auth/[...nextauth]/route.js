import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import mongoose from "mongoose";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDb";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectDB();

      if (account.provider == "github" || account.provider == "google") {
        const CurrentUser = await User.findOne({ email: user.email });

        if (!CurrentUser) {
          const newUser = new User({
            email: user.email,
            username: user.email.split("@")[0],
          });
          await newUser.save();
          user.name = newUser.username;
        } else {
          user.name = CurrentUser.username;
        }
      }
      return true;
    },
    async session({ session, token, user }) {
      const dbUser = await User.findOne({ email: session.user.email });
      session.user.name = dbUser.username;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
