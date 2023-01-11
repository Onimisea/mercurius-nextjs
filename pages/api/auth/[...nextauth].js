import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_ID,
      clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const data = {
          email: credentials.email,
          password: credentials.password,
        };

        const options = {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(data),
        };

        // Add logic here to look up the user from the credentials supplied
        let user = await fetch(
          "http://localhost:8000/api/users/verify/",
          options
        ).then((res) => res.json());

        if (user.fullname) {
          // Any object returned will be saved in `user` property of the JWT

          const loginUser = await fetch(
            "http://localhost:8000/api/users/login/",
            options
          ).then((res) => res.json());

          if (loginUser.error) {
            return null;
          } else {
            return user;
          }
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        }
      },
    }),
  ],
});
