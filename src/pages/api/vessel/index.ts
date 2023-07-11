import { NextApiRequest, NextApiResponse } from 'next/types';
import { ApiResponseType } from "src/types/api/responseType";
import Database from '../../../data-source'
import Vessel from 'src/entity/Vessel';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponseType>) {

  let stsCode;
  let sts;
  let stsMessage;
  let resmsg;
  const enVessel = Vessel

  if (req.method === 'GET') {
    const { id } = req.query;
    const db = new Database({ entities: [enVessel] })

    try {
      const ds = await db.connect()
      const rep = ds.getRepository(enVessel);
      const data = (id === "a") ? await rep.find() : await rep.find({ where: { vesCode: `${id}` } });

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
