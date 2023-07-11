import { NextApiRequest, NextApiResponse } from 'next/types';
import { ApiResponseType } from "src/types/api/responseType";
import Database from '../../../data-source'
import Port from 'src/entity/Port';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponseType>) {

  let stsCode;
  let sts;
  let stsMessage;
  let resmsg;
  const enPort = Port;

  if (req.method === 'GET') {
    const { id, cn } = req.query;
    const db = new Database({ entities: [enPort], log: false })

    try {
      const ds = await db.connect()
      const rep = ds.getRepository(enPort);
      const data = (id === "a") ? await rep.find() : await rep.find({ where: { flag: `${cn}` } });

      stsCode = "200";
      sts = true;
      stsMessage = "succeed"
      resmsg = data;
    } catch (error) {
      stsCode = "500";
      sts = false;
      stsMessage = "failed"
      resmsg = error.message;
    } finally {
      await db.disconnect()

      const resJson: ApiResponseType = {
        errorCode: stsCode,
        message: stsMessage,
        status: sts,
        data: resmsg,
      }

      return res.status(stsCode).json(resJson);
    }

  }

  return null
}
