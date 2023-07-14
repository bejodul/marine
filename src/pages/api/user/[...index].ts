import { NextApiRequest, NextApiResponse } from "next/types";
import DataBase from "src/data-source";
import { User } from "src/entity/User";
import { ApiResponseType } from "src/types/api/responseType";

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponseType>) {

  const pathValues = req.query.index
  const enUser = User
  const db = new DataBase({ entities: [enUser], log: false })

  let errorCode, message, data, status

  if (pathValues[0] === "login") {

    if (req.method === "POST") {
      try {

        const { username } = req.body
        const ds = await db.connect()
        const res = ds.getRepository(enUser)
        const rs = await res.findOne({ where: { userName: `${username}` } })

        if (rs) {
          data = rs
          errorCode = "200"
          message = "succeed"
          status = true
        } else {
          data = rs
          errorCode = "204"
          message = "failed"
          status = false
        }

      } catch (error) {
        console.log(error)
        errorCode = "500"
        message = error.message
        status = false
      } finally {
        await db.disconnect()

        const resJson: ApiResponseType = {
          errorCode: errorCode,
          message: message,
          data: data,
          status: status,
        }

        return res.status(errorCode).end(JSON.stringify(resJson))
      }
    }


  }
}
