import { NextApiRequest, NextApiResponse } from 'next/types';
import Database from '../../../data-source'
import { Pkk } from "../../../entity/Pkk";
import { ApiResponseType } from "src/types/api/responseType";

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponseType>) {

  let stsCode;
  let sts;
  let stsMessage;
  let resmsg;
  const enPkk = Pkk
  const failedStatus = "failed"
  const succeedStatus = "success"

  if (req.method === 'GET') {
    const { id } = req.query;
    const db = new Database({ entities: [enPkk] })

    try {
      const ds = await db.connect()

      const rep = ds.getRepository(enPkk);

      const data = (id === "a") ? await rep.find() : await rep.find({ where: { vesId: `${id}` } });

      stsCode = "200";
      sts = true;
      stsMessage = succeedStatus
      resmsg = data;

    } catch (error) {
      stsCode = "500";
      sts = false;
      stsMessage = failedStatus
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

  } else if (req.method === "POST") {

    const db = new Database()

    try {
      const body: Pkk = req.body

      const ds = await db.connect()

      await ds.transaction(async (manager) => {
        const pkk = body

        //null validation
        let nullMsg
        if (pkk.vesCode == null) nullMsg = "Vessel code is required"
        else if (pkk.vesName == null) nullMsg = "Vessel name is required"
        else if (pkk.voyIn == null) nullMsg = "In Voyage is required"
        else if (pkk.voyOut == null) nullMsg = "Out Voyage is required"
        else if (pkk.pkkNo == null) nullMsg = "PKK No is required"
        else if (pkk.eta == null) nullMsg = "ETA is required"
        else if (pkk.etd == null) nullMsg = "ETD is required"
        else if (pkk.jnKunjungan == null) nullMsg = "Visit Type is required"
        else if (pkk.jnKemasan == null) nullMsg = "Kemasan Type is required"
        else if (pkk.jnKegiatan == null) nullMsg = "Activity Type is required"
        else if (pkk.pelAsal == null) nullMsg = "Origin Port is required"
        else if (pkk.pelSebelum == null) nullMsg = "Last Port is required"
        else if (pkk.pelBerikut == null) nullMsg = "Next Port is required"
        else if (pkk.pelAkhir == null) nullMsg = "Final Port is required"

        if (nullMsg) {
          stsCode = 400;
          sts = false;
          stsMessage = failedStatus
          resmsg = nullMsg
        } else {
          manager.insert(enPkk, pkk)

          stsCode = 200;
          sts = true;
          stsMessage = succeedStatus
        }
      })

    } catch (error) {
      stsCode = "500";
      sts = false;
      stsMessage = failedStatus
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
