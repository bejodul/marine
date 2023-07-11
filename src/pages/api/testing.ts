import { NextApiRequest, NextApiResponse } from "next/types";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const payload = await getToken({ req });

  if (payload) {
    console.log("JSON Web Token", payload)

    const secretKey = process.env.NEXTAUTH_SECRET

    const token = jwt.sign(payload, secretKey);

    const decoded: jwt.JwtPayload = jwt.verify(token, secretKey) as jwt.JwtPayload;

    const currentTimestamp = Math.floor(Date.now() / 1000); // Mendapatkan timestamp saat ini dalam detik

    if (decoded.exp && decoded.exp < currentTimestamp) {
      console.log("JWT has expired"); // JWT telah kedaluwarsa
    } else {
      const date = new Date(decoded.exp * 1000);
      console.log("JWT is still valid : " + date.toLocaleDateString()); // JWT masih valid
    }


    return res.status(200).end(token);
  } else {
    return res.status(500).end("kesalahan");
  }
}
