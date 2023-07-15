import { Menu } from "../../../entity/Menu"
import { ApiResponseType } from "src/types/api/responseType";
import { NextApiRequest, NextApiResponse } from "next/types";
import DataBase from "src/data-source";

interface DataMenu {
  title: string,
  path: string,
  children?: DataMenuChild[]
}

interface DataMenuChild {
  title: string,
  path: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseType>
) {

  const { l } = req.query;

  let stsCode;
  let sts;
  let stsMessage;
  let resmsg;
  const enWebMenu = Menu

  const db = new DataBase({ entities: [enWebMenu] })
  const ds = await db.connect()
  const rep = await ds.getRepository(enWebMenu);

  try {
    if (l === "a") {
      const webmenu1 = await rep.find({ where: { menuLevel: "1" }, order: { menuIndex: "asc" } });

      const webmenu2 = await rep.find({ where: { menuLevel: "2" }, order: { menuIndex: "asc" } });

      await db.disconnect()

      const datamenu = [];
      webmenu1.map(async (data1) => {

        const hasChild = await webmenu2.filter((data2) => data2.parentId === data1.menuId)

        const datas: DataMenu = {
          title: data1.title,
          path: data1.path,
          children: []
        }

        if (hasChild.length > 0) {
          hasChild.map(async (child2) => {
            const datas2: DataMenuChild = {
              title: child2.title,
              path: child2.path,
            }

            await datas.children.push(datas2);
          });
        }

        datamenu.push(datas);

      });

      resmsg = await datamenu;

    } else {

      const webmenu = await rep.find({ where: { menuLevel: `${l}` }, order: { menuIndex: "asc" } });

      resmsg = webmenu;

      await db.disconnect()

    }

    stsCode = "200";
    sts = true;
    stsMessage = "succeed"
  } catch (error) {
    stsCode = "500";
    sts = false;
    stsMessage = "failed"
    resmsg = error.message;
  } finally {
    const resJson: ApiResponseType = {
      errorCode: stsCode,
      message: stsMessage,
      status: sts,
      data: resmsg,
    }

    return res.status(stsCode).json(resJson);
  }
}
