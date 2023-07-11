import { NextApiRequest, NextApiResponse } from 'next/types';
import { ApiResponseType } from "src/types/api/responseType";
import Database from '../../../data-source'
import Country from 'src/entity/Country';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponseType>) {

  let stsCode;
  let sts;
  let stsMessage;
  let resmsg;
  const enCountry = Country;

  if (req.method === 'GET') {
    const { id } = req.query;
    const db = new Database({ entities: [enCountry] })

    try {
      const ds = await db.connect()
      const rep = ds.getRepository(enCountry);
      const data = (id === "a") ? await rep.find({ order: { nmBendera: 'asc' } }) : await rep.find({ where: { kdBendera: `${id}` } });

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
