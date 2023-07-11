import { NextApiRequest, NextApiResponse } from 'next/types';
import { OpH } from '../../../../entity/Op_h';
import { ApiResponseType } from 'src/types/api/responseType';
import { AppDataSource } from 'src/data-source';

interface op {
  id: string;
  ves_id: string;
  vessel_name: string;
  voyage: string;
  berth: string;
  start_work: Date;
  end_work: Date;
  op_ke: number;
}

const Handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseType>
) => {
  let queryRunner;
  let isError = false;
  let resCode = '00';
  let resMsg = 'Succeed';
  let result: op[] = [];
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.status(200).end();

    return;
  }

  // const where = { id: "SIII01231", op_ke: "1" };

  switch (req.method) {
    case 'GET':
      try {

        const connection = await AppDataSource.initialize();
        queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const repo = queryRunner.manager.getRepository(OpH);
        const response = await repo
          .createQueryBuilder()
          .innerJoinAndSelect("OpH.pkk", "Pkk")
          .leftJoinAndSelect("OpH.master_kade", "Kade")
          .where("OpH.status=0")
          .orderBy("OpH.vesId", "ASC")
          .addOrderBy("OpH.opKe", "ASC")
          .getMany();

          // .where("OpH.vesId=:id and OpH.opKe=:op_ke")
          // .setParameters(where)

        result = response.map(oph => ({
          id: oph.vesId + '-' + oph.opKe,
          ves_id: oph.vesId,
          vessel_name: oph.pkk.vesName,
          voyage: oph.pkk.voyIn + '/' + oph.pkk.voyOut,
          berth: oph.master_kade.nmKade,
          start_work: oph.mulai,
          end_work: oph.selesai,
          op_ke: oph.opKe,
        }));
        if (result.length <= 0) {
          resCode = '99'
          resMsg = "Data not found!"
        }

        // await queryRunner1.connect();
        // const result = await queryRunner1.query(
        //     `SELECT A.*FROM OP_H A LEFT JOIN KADE B ON (A.SITE_ID=B.SITE_ID AND A.GROUP_ID = B.GROUP_ID AND A.KD_KADE=B.KD_KADE)`
        //   );
        //   console.log("result = ",result)
        //   await queryRunner1.release()
      } catch (error) {
        isError = true;
        resCode = '01';
        resMsg = 'Terjadi Kesalahan Transaksi ' + error;
        if (queryRunner) {
          await queryRunner.rollbackTransaction();
        }
      } finally {
        if (isError) {
          await queryRunner?.rollbackTransaction()
          if (resCode === '401') {
            res.status(401).json({ errorCode: resCode, message: 'Unauthorized', data: result })
          } else if (resCode === '405') {
            res
              .status(405)
              .json({ errorCode: resCode, message: `Method ${req.method} Not Allowed`, data: result })
          } else {
            res.status(500).json({ errorCode: resCode, message: resMsg, data: result })
          }
        } else {
          await queryRunner?.commitTransaction()
          res.status(200).json({ errorCode: resCode, message: resMsg, data: result });
        }
        if (queryRunner) {
          await queryRunner.release()
        }
        await AppDataSource.destroy().catch(() => console.log('Database Close failed'))
      }
      break;
    default:
      res.status(405).json({ errorCode: '02', message: 'Metode Tidak Diizinkan' });
      break;
  }
};

export default Handler;
