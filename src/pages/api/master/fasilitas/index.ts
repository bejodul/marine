import { NextApiRequest, NextApiResponse } from 'next/types'
import { MasterFasilitas } from '../../../../entity/MasterFasilitas'
import { ApiResponseType } from 'src/types/api/responseType'
import { AppDataSource } from 'src/data-source'

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponseType>) {
  let stsCode
  let sts
  let stsMessage
  let resmsg

  if (req.method === 'GET') {
    const { id } = req.query

    try {
      const ds = await AppDataSource.initialize();

      const rep = ds.getRepository(MasterFasilitas)

      const data = id === 'a' ? await rep.find() : await rep.find({ where: { fasilitasId: `${id}` } })

      stsCode = '200'
      sts = true
      stsMessage = 'succeed'
      resmsg = data
    } catch (error) {
      stsCode = '500'
      sts = false
      stsMessage = 'failed'
      resmsg = error.message
    } finally {
      await AppDataSource.destroy().catch(() => console.log('Database Close failed'))
      const resJson: ApiResponseType = {
        errorCode: stsCode,
        message: stsMessage,
        status: sts,
        data: resmsg
      }

      return res.status(stsCode).json(resJson)
    }
  } else if (req.method === 'POST') {
    try {
      const body: MasterFasilitas = req.body

      const ds = await AppDataSource.initialize();

      await ds.transaction(async manager => {
        const data = body

        //validasi

        await manager.insert(MasterFasilitas, data)

        stsCode = 200
        sts = true
        stsMessage = 'succeed'
      })
    } catch (error) {
      stsCode = '500'
      sts = false
      stsMessage = 'failed'
      resmsg = error.message

      console.log(resmsg)
    } finally {
      await AppDataSource.destroy().catch(() => console.log('Database Close failed'))

      const resJson: ApiResponseType = {
        errorCode: stsCode,
        message: stsMessage,
        status: sts,
        data: resmsg
      }

      return res.status(stsCode).json(resJson)
    }
  } else if (req.method === 'DELETE') {
    try {
      const body: MasterFasilitas = req.body

      const ds = await AppDataSource.initialize();

      const rep = ds.getRepository(MasterFasilitas)

      await rep.delete({ fasilitasId: body.fasilitasId })
      stsCode = 200
      sts = true
      stsMessage = 'succeed'
    } catch (error) {
      stsCode = '500'
      sts = false
      stsMessage = 'failed'
      resmsg = error.message

      console.log(resmsg)
    } finally {
      await AppDataSource.destroy().catch(() => console.log('Database Close failed'))

      const resJson: ApiResponseType = {
        errorCode: stsCode,
        message: stsMessage,
        status: sts,
        data: resmsg
      }

      return res.status(stsCode).json(resJson)
    }
  } else if (req.method === 'PUT') {
    try {
      const body: MasterFasilitas = req.body

      const ds = await AppDataSource.initialize();

      const rep = ds.getRepository(MasterFasilitas)

      await rep.update(body.fasilitasId, body)
      stsCode = 200
      sts = true
      stsMessage = 'succeed'
    } catch (error) {
      stsCode = '500'
      sts = false
      stsMessage = 'failed'
      resmsg = error.message

      console.log(resmsg)
    } finally {
      await AppDataSource.destroy().catch(() => console.log('Database Close failed'))

      const resJson: ApiResponseType = {
        errorCode: stsCode,
        message: stsMessage,
        status: sts,
        data: resmsg
      }

      return res.status(stsCode).json(resJson)
    }
  }
}
