import { WebMenu } from "../../../entity/Menu"
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
  const enWebMenu = WebMenu

  const db = new DataBase({entities:[enWebMenu]})
  const ds = await db.connect()
  const rep = await ds.getRepository(enWebMenu);

  try {
    if (l === "a") {
      const webmenu1 = await rep.find({ where: { MENU_LEVEL: "1" }, order: { MENU_INDEX: "asc" } });

      const webmenu2 = await rep.find({ where: { MENU_LEVEL: "2" }, order: { MENU_INDEX: "asc" } });

      await db.disconnect()

      const datamenu = [];
      webmenu1.map(async (data1) => {

        const hasChild = await webmenu2.filter((data2) => data2.PARENT_ID === data1.MENU_ID)

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

      const webmenu = await rep.find({ where: { MENU_LEVEL: `${l}` }, order: { MENU_INDEX: "asc" } });

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

    console.log(resmsg)
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
