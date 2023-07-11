import { NextApiRequest, NextApiResponse } from 'next/types';
import { OpH } from '../../../../entity/Op_h';
import { ApiResponseType } from 'src/types/api/responseType';
import DataBase from 'src/data-source';
import { Kade } from 'src/entity/Kade';
import { Pkk } from 'src/entity/Pkk';

interface op {
  id: string;
  ves_id: string;
  ves_name: string;
  voyage: string;
  nm_kade: string;
  mulai: Date;
  selesai: Date;
  op_ke: number;
}

const Handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseType>
) => {
  let isError = false;
  const db = new DataBase({ entities: [OpH, Kade, Pkk], log: true })
  let resCode = '00';
  let resMsg = 'Succeed';
  let result = {};
  let dataColumn: op[] = [];
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
        const { sort, sortColumn, searchValue, page, pageSize } = req.query;
        const isParams = sort !== undefined && sortColumn !== undefined && searchValue !== undefined && page !== undefined && pageSize !== undefined;

        console.log("query : ", isParams)
        console.log("sort : ", sort)
        console.log("sortColumn : ", sortColumn)
        console.log("searchValue : ", searchValue)
        console.log("page : ", page)
        console.log("pageSize : ", pageSize)
        const connection = await db.connect();
        const repo = connection.getRepository(OpH);
        let response;
        let total = 0;
        if (isParams) {
          const start = (Number(page) * Number(pageSize)) + 1;
          const end = (Number(page) + 1) * Number(pageSize);
          let sortCoumnTable = 'OpH.VES_ID';
          if (sortColumn.toString().toUpperCase() == 'OP_KE' || sortColumn.toString().toUpperCase() == 'MULAI' || sortColumn.toString().toUpperCase() == 'SELESAI') {
            sortCoumnTable = 'OpH.' + sortColumn.toString().toUpperCase();
          } else if (sortColumn.toString().toUpperCase() == 'VES_NAME') {
            sortCoumnTable = 'Pkk.' + sortColumn.toString().toUpperCase();
          } else if (sortColumn.toString().toUpperCase() == 'NM_KADE') {
            sortCoumnTable = 'Kade.' + sortColumn.toString().toUpperCase();
          } else if (sortColumn.toString().toUpperCase() == 'VOYAGE') {
            sortCoumnTable = `"Pkk"."VOY_IN"||"Pkk"."VOY_OUT"`
          }

          const subquery = repo
            .createQueryBuilder()
            .select('OpH.VES_ID', 'VES_ID')
            .addSelect('OpH.OP_KE', 'OP_KE')
            .addSelect('OpH.MULAI', 'MULAI')
            .addSelect('OpH.SELESAI', 'SELESAI')
            .addSelect('Pkk.VES_NAME', 'VES_NAME')
            .addSelect('Pkk.VOY_IN', 'VOY_IN')
            .addSelect('Pkk.VOY_OUT', 'VOY_OUT')
            .addSelect('Kade.NM_KADE', 'NM_KADE')
            .addSelect(`ROW_NUMBER() OVER (ORDER BY ${sortCoumnTable} ${sort}) AS rnum`)
            .innerJoin("OpH.pkk", "Pkk")
            .leftJoin("OpH.master_kade", "Kade")
            .where("OpH.status=0")
            .andWhere(
              `lower(OpH.VES_ID) LIKE :searchValue OR
              lower(OpH.OP_KE) LIKE :searchValue OR
              lower(OpH.MULAI) LIKE :searchValue OR
              lower(OpH.SELESAI) LIKE :searchValue OR
              lower(Pkk.VES_NAME) LIKE :searchValue OR
              lower(Pkk.VOY_IN) LIKE :searchValue OR
              lower(Pkk.VOY_OUT) LIKE :searchValue OR
              lower(Kade.NM_KADE) LIKE :searchValue`,
              { searchValue: `%${searchValue.toString().toLowerCase().trim()}%` }
            )

          response = await connection.createQueryBuilder()
            .from('(' + subquery.getQuery() + ')', 'a')
            .where('rnum BETWEEN :start AND :end', { start: start, end: end, searchValue: `%${searchValue.toString().toLowerCase().trim()}%` }).getRawMany();
          console.table(response)
          total = await subquery.getCount();
          dataColumn = response.map(oph => ({
            id: oph.VES_ID + '-' + oph.OP_KE,
            ves_id: oph.VES_ID,
            ves_name: oph.VES_NAME,
            voyage: oph.VOY_IN + '/' + oph.VOY_OUT,
            nm_kade: oph.NM_KADE,
            mulai: oph.MULAI,
            selesai: oph.SELESAI,
            op_ke: oph.OP_KE,
          }));

        } else {
          response = await repo
            .createQueryBuilder()
            .innerJoinAndSelect("OpH.pkk", "Pkk")
            .leftJoinAndSelect("OpH.master_kade", "Kade")
            .where("OpH.status=0")
            .orderBy("OpH.vesId", "ASC")
            .addOrderBy("OpH.opKe", "ASC")
            .getMany();
          dataColumn = response.map(oph => ({
            id: oph.vesId + '-' + oph.opKe,
            ves_id: oph.vesId,
            ves_name: oph.pkk.vesName,
            voyage: oph.pkk.voyIn + '/' + oph.pkk.voyOut,
            nm_kade: oph.master_kade.nmKade,
            mulai: oph.mulai,
            selesai: oph.selesai,
            op_ke: oph.opKe,
          }));
          total = dataColumn.length;
        }


        if (dataColumn.length <= 0) {
          resCode = '99'
          resMsg = "Data not found!"
        }
        result = {
          total: total,
          data: dataColumn
        }

      } catch (error) {
        isError = true;
        resCode = '01';
        resMsg = 'Terjadi Kesalahan Transaksi ' + error;
      } finally {
        if (isError) {
          res.status(401).json({ errorCode: resCode, message: 'Unauthorized', data: result })
        } else {
          res.status(200).json({ errorCode: resCode, message: resMsg, data: result });
        }

        await db.disconnect()
      }
      break;
    case 'PUT':
      const { id } = req.body;
      console.log("id : ", id)
      isError = false;
      res.status(200).json({ errorCode: resCode, message: resMsg, data: result, status: isError });
      break;
    default:
      res.status(405).json({ errorCode: '02', message: 'Metode Tidak Diizinkan' });
      break;
  }
};

export default Handler;
