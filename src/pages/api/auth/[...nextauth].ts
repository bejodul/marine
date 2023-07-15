import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth"
import { sign } from 'jsonwebtoken'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) { //eslint-disable-line
        const body = {
          username: credentials.username
        };

        console.log(`${credentials.username}`)

        let login
        try {
          login = await fetch(`${process.env.API_URL}/api/user/login/`, {//eslint-disable-line
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
          })
        } catch (error) {
          console.log(error)
        }

        console.log("2")

        if (login.ok) {
          console.log("3")
          const jsonRes = await login.json()

          let menu

          try {
            menu = await fetch(`${process.env.API_URL}/api/menu/user/username/?p=${credentials.username}`, {//eslint-disable-line
              method: "GET",
              headers: {
                'Content-Type': 'application/json',
              }
            })

            console.log("masuk")
          } catch (error) {
            console.log(error)
          }


          console.log("4")

          const menuJson = await menu.json()

          console.log(menuJson.data)

          const user = { id: "1", name: `${jsonRes.data.name}`, email: `${jsonRes.data.userName}`, menuList: menuJson.data }

          return user
        }

        return null
      }
    })
  ],
  session: {
    maxAge: 100000,

  },
  callbacks: {
    async session({ session, token }) {

      const jwtToken = sign(token, process.env.NEXTAUTH_SECRET);
      session.accessToken = jwtToken;
      session.menuList = token.menuList;

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) { //eslint-disable-line

      if (user && user.menuList) {
        token.menuList = user.menuList;
      }

      return token;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url

      return baseUrl
    }
  },
}

export default NextAuth(authOptions)
