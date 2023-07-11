import type { NextApiRequest, NextApiResponse } from 'next';
import { useRouter } from 'next/router';
import { AppDataSource } from '../../../data-source';
import { TBL_USER } from '../../../entity/userdt';
import cors from 'cors';
import { error } from 'console';

type Data = {
    errorCode: string;
    status?: boolean;
    message: string;
    data?: any;
};

interface rpkop {
    id: string;
    nama: string;
}

const Handler = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) => {
    console.log("method : ",req.method)
    let queryRunner;
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

    console.log("Method terbaru : ",req.method)
    
    switch (req.method) {
        case 'GET':
            try {
                const connection = await AppDataSource.initialize();
                queryRunner = connection.createQueryRunner();
                await queryRunner.connect();
                await queryRunner.startTransaction();
                const repo = queryRunner.manager.getRepository(TBL_USER);
                const data = await repo.find({
                    order: {
                        id: {
                            name: "ASC"
                        }
                    }
                });
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
        case 'POST':
            try {
                const objBody: TBL_USER = req.body;
                const connection = await AppDataSource.initialize();
                queryRunner = connection.createQueryRunner();
                await queryRunner.connect();
                await queryRunner.startTransaction();
                const repo = queryRunner.manager.getRepository(TBL_USER);
                const insert = await repo.insert(objBody);
                result.push({
                    id: objBody.id.toString(),
                    nama: objBody.nama
                })
                if (result.length <= 0) {
                    resCode = '99'
                    resMsg = "Data not found!"
                }
            } catch (error) {
                isError = true;
                resCode = '01';
                resMsg = 'Terjadi Kesalahan Transaksi ' + error;
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
        case "PUT":
            try {
                const objBody: TBL_USER = req.body;
                const connection = await AppDataSource.initialize();
                queryRunner = connection.createQueryRunner();
                await queryRunner.connect();
                await queryRunner.startTransaction();
                const repo = queryRunner.manager.getRepository(TBL_USER);
                const user = await repo.createQueryBuilder().where("id = :id", { id: objBody.id }).getOne();
                if (user) {
                    const update = await repo.save(objBody);
                    result.push({
                        id: objBody.id.toString(),
                        nama: objBody.nama
                    })
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
            return res.status(405).json({ errorCode: '02', message: 'Method Not Allowed' });
    }
};

export default Handler;