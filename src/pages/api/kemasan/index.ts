import { NextApiRequest, NextApiResponse } from 'next/types';
import { ApiResponseType } from "src/types/api/responseType";
import Database from '../../../data-source'
import Kemasan from 'src/entity/Kemasan';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponseType>) {

  let stsCode;
  let sts;
  let stsMessage;
  let resmsg;
  const enKemasan = Kemasan;

  if (req.method === 'GET') {
    const { id } = req.query;
    const db = new Database({ entities: [enKemasan], log: false })

    try {
      const ds = await db.connect()
      const rep = ds.getRepository(enKemasan);
      const data = (id === "a") ? await rep.find() : await rep.find({ where: { kdKemasan: `${id}` }, order: { kdKemasan: 'asc' } });

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
}
