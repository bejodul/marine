import { NextApiRequest, NextApiResponse } from 'next';
import { AppDataSource } from '../../../data-source';
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
    const { id } = req.query;

    switch (req.method) {
        case 'GET':
            try {
                const connection = await AppDataSource.initialize();
                queryRunner = connection.createQueryRunner();
                await queryRunner.startTransaction();
                const repo = queryRunner.manager.getRepository(TBL_USER);
                const user = await repo.createQueryBuilder().where("id = :id", { id: parseInt(id as string) }).getOne();
                if (user) {
                    return res.status(500).json({ errorCode: resCode, message: resMsg, status: isError, data: user });
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
                if (queryRunner) {
                    await queryRunner.release();
                }
                await AppDataSource.destroy().catch(() => {
                    resCode = '03';
                    isError = true;
                    resMsg = 'Database Close failed';
                });
            }
            return res.status(500).json({ errorCode: resCode, message: resMsg, status: isError });
            break;
            case "DELETE":
                try {
                    const connection = await AppDataSource.initialize();
                    queryRunner = connection.createQueryRunner();
                    await queryRunner.startTransaction();
                    const repo = queryRunner.manager.getRepository(TBL_USER);
                    const user = await repo.createQueryBuilder().where("id = :id", { id: id }).getOne();
                    if (user) {
                        const del = await repo.createQueryBuilder().delete().from(TBL_USER).where("id = :id", { id: parseInt(id as string) }).execute();
                        await queryRunner.commitTransaction();
                        return res.status(500).json({ errorCode: resCode, message: resMsg, status: isError, data:  id });
                    } else {
                        isError = true;
                        resCode = '404';
                        resMsg = 'Data Not Found';
                    }
                } catch (error) {
                    isError = true;
                    resCode = '01';
                    resMsg = 'Transaction Error';
                    if (queryRunner && queryRunner.isTransactionActive) {
                        await queryRunner.rollbackTransaction();
                    }
                } finally {
                    if (queryRunner) {
                        await queryRunner.release();
                    }
                    await AppDataSource.destroy().catch(() => {
                        resCode = '03';
                        isError = true;
                        resMsg = 'Database Close failed';
                    });
                }
                return res.status(500).json({ errorCode: resCode, message: resMsg, status: isError });
                break;
        default:
            return res.status(405).json({ errorCode: '02', message: 'Method Not Allowed' });
    }
};

export default Detail;
