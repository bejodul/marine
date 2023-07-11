import { NextApiRequest, NextApiResponse } from 'next/types';
import { ApiResponseType } from "src/types/api/responseType";
import Database from '../../../data-source'
import Syscode from 'src/entity/Syscode';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponseType>) {

  let stsCode;
  let sts;
  let stsMessage;
  let resmsg;
  const enSyscode = Syscode;

  if (req.method === 'GET') {
    const { id } = req.query;
    const db = new Database({ entities: [enSyscode], log: false })

    try {
      const ds = await db.connect()
      const rep = ds.getRepository(enSyscode);
      const data = (id === "a") ? await rep.find() : await rep.find({ where: { codeTp: `${id}` }, order: { codeTp: 'asc' } });

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
