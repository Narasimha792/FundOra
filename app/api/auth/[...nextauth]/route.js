import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import LinkedInProvider from "next-auth/providers/linkedin";
import ProviderCredentials from "next-auth/providers/credentials";
import next from "next";
import { signIn } from "next-auth/react";
import mongoose from "mongoose";
import User from "@/app/models/user";
import payment from "@/app/models/payment";

const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // LinkedInProvider({
    //   clientId: process.env.LINKEDIN_CLIENT_ID,
    //   clientSecret: process.env.LINKEDIN_CLIENT_SECRET
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
   ProviderCredentials({
       name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      await mongoose.connect(process.env.MONGO_URI);

      const user = await User.findOne({ email: credentials.email });
      if (!user) return null; // User not found

      if (user.password !== credentials.password) return null; // Wrong password

      return user;
    }
   })
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    // }),
    // TwitterProvider({
    //   clientId: process.env.TWITTER_CLIENT_ID,
    //   clientSecret: process.env.TWITTER_CLIENT_SECRET
    // }),
  ],
  callbacks: {
  async signIn({ user, account }) {
    if(account.provider === "google" || account.provider === "github"){
      if(mongoose.connection.readyState === 0) await mongoose.connect(process.env.MONGO_URI);
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        const newUser = new User({
          name: user.name,
          email: user.email,
          image: user.image,
          username: user.email.split('@')[0],
        });
        await newUser.save();
      }
    }
    return true;
  },
  async jwt({ token, account }) {
    if (account) token.accessToken = account.access_token;
    return token;
  },
  async session({ session, token,user }) {
    session.user.accessToken = token.accessToken;
    return session;
  }
}
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
