import { NextApiRequest, NextApiResponse } from 'next/types';
import DataBase from '../../../data-source';
import { TBL_USER } from '../../../entity/userdt';

type Data = {
  errorCode: string;
  status?: boolean;
  message: string;
  data?: any;
};

const Detail = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  let queryRunner;
  let isError = false;
  let resCode = '00';
  let resMsg = 'Succeed';
  let user;
  const { id } = req.query;
  const db = new DataBase({entities:[TBL_USER]})

  switch (req.method) {
    case 'GET':
      try {
        const connection = await db.connect();
        const repo = connection.getRepository(TBL_USER);
        user = await repo.createQueryBuilder().where("id = :id", { id: parseInt(id as string) }).getOne();
        if (!user) {
          isError = true;
          resCode = '404';
          resMsg = 'Data Not Found';
        }
      } catch (error) {
        isError = true;
        resCode = '01';
        resMsg = 'Transaction Error';
      } finally {
        res.status(200).json({ errorCode: resCode, message: resMsg, status: isError, data: user });
        await db.disconnect();
      }
      break;
    case "DELETE":
      try {
        const connection = await db.connect();
        queryRunner = connection.createQueryRunner();
        await queryRunner.startTransaction();
        const repo = queryRunner.manager.getRepository(TBL_USER);
        user = await repo.createQueryBuilder().where("id = :id", { id: id }).getOne();
        if (user) {
          const del = await repo.createQueryBuilder().delete().from(TBL_USER).where("id = :id", { id: parseInt(id as string) }).execute();
          if (!del) {
            isError = true;
            resCode = '99';
            resMsg = 'Delete Failed';
          }
        } else {
          isError = true;
          resCode = '404';
          resMsg = 'Data Not Found';
        }
      } catch (error) {
        isError = true;
        resCode = '01';
        resMsg = 'Transaction Error';
      } finally {
        if(isError){
          await queryRunner?.rollbackTransaction();
        }else{
          await queryRunner?.commitTransaction()
        }
        if (queryRunner) {
          await queryRunner?.release();
        }
        await db.disconnect();
        res.status(200).json({ errorCode: resCode, message: resMsg, data: user, status: isError });
      }
      break;
    default:
      return res.status(405).json({ errorCode: '02', message: 'Method Not Allowed' });
  }
};

export default Detail;
