import type { NextApiRequest, NextApiResponse } from 'next/types';
import { TBL_USER } from '../../../entity/userdt';
import { ApiResponseType } from 'src/types/api/responseType';
import DataBase from 'src/data-source';

interface rpkop {
  id: number;
  nama: string;
}

const Handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseType>
) => {
  let queryRunner;
  const db = new DataBase({ entities: [TBL_USER] });
  let isError = false;
  let resCode = '00';
  let resMsg = 'Succeed';
  let result: rpkop[] = [];

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.status(200).end();

    return;
  }

  switch (req.method) {
    case 'GET':
      try {
        const connection = await db.connect();
        const repo = connection.getRepository(TBL_USER);
        const data = await repo.createQueryBuilder().orderBy('id', 'ASC').getMany();
        result = data.map(dt => ({
          id: dt.id,
          nama: dt.nama
        })
        );
        if (result.length <= 0) {
          resCode = '99'
          resMsg = "Data not found!"
        }
      } catch (error) {
        isError = true;
        resCode = '01';
        resMsg = 'Terjadi Kesalahan Transaksi ' + error;
      } finally {
        if (queryRunner) {
          await queryRunner.release()
        }
        await db.disconnect();
        res.status(200).json({ errorCode: resCode, message: resMsg, data: result });
      }
      break;
    case 'POST':
      try {
        const objBody: TBL_USER = req.body;
        const connection = await db.connect();
        queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const repo = queryRunner.manager.getRepository(TBL_USER);
        const insert = await repo.insert(objBody);
        if (!insert) {
          isError = true;
          resCode = '99'
          resMsg = "Insert Failed!"
        } else {
          result.push({
            id: objBody.id,
            nama: objBody.nama
          })
        }

      } catch (error) {
        isError = true;
        resCode = '01';
        resMsg = 'Terjadi Kesalahan Transaksi ' + error;
      } finally {
        if (isError) {
          await queryRunner?.rollbackTransaction()
        } else {
          await queryRunner?.commitTransaction()
        }
        if (queryRunner) {
          await queryRunner.release()
        }
        res.status(200).json({ errorCode: resCode, message: resMsg, data: result, status: isError });
        await db.disconnect();
      }
      break;
    case "PUT":
      try {
        const objBody: TBL_USER = req.body;
        const connection = await db.connect();
        queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const repo = queryRunner.manager.getRepository(TBL_USER);
        const user = await repo.createQueryBuilder().where("id = :id", { id: objBody.id }).getOne();
        if (user) {
          const update = await repo.save(objBody);
          if (!update) {
            isError = true;
            resCode = '99';
            resMsg = 'Update Failed';
          } else {
            result.push({
              id: objBody.id,
              nama: objBody.nama
            })
          }
        } else {
          isError = true;
          resCode = '404';
          resMsg = 'Data Not Found';
        }
      } catch (error) {
        isError = true;
        resCode = '01';
        resMsg = 'Terjadi Kesalahan Transaksi ' + error;
      } finally {
        if (isError) {
          await queryRunner?.rollbackTransaction()
        } else {
          await queryRunner?.commitTransaction()
        }
        if (queryRunner) {
          await queryRunner.release()
        }
        res.status(200).json({ errorCode: resCode, message: resMsg, data: result });
        await db.disconnect();
      }
      break;
    default:
      res.status(405).json({ errorCode: '02', message: 'Method Not Allowed' });
  }
};

export default Handler;
