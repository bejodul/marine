import { NextApiRequest, NextApiResponse } from "next/types";
import DataBase from "src/data-source";
import { Menu } from "src/entity/Menu";
import { MenuClass } from "src/entity/MenuClass";
import { User } from "src/entity/User";
import { ApiResponseType } from "src/types/api/responseType";

interface DataMenu {
  title: string,
  path: string,
  children?: DataMenuChild[]
}

interface DataMenuChild {
  title: string,
  path: string,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponseType>) {

  const entMenu = Menu
  const entMenuClass = MenuClass
  const entUser = User
  const db = new DataBase({ entities: [entMenu, entMenuClass, entUser], log: false })
  const pathValues = req.query.index

  let errorCode, message, data, status


  if (req.method === "GET") {

    const { p } = req.query

    try {
      const ds = await db.connect()
      const rep = ds.getRepository(entMenuClass)

      let webmenu1
      let webmenu2

      if (pathValues[0] === "class") {
        webmenu1 = await rep.find({
          where: {
            menu: {
              menuLevel: "1"
            },
            userClass: `${p}`
          },
          order: {
            menu: {
              menuIndex: "asc"
            }
          },
          relations: {
            menu: true
          }
        })

        webmenu2 = await rep.find({
          where: {
            menu: {
              menuLevel: "2"
            },
            userClass: `${p}`
          },
          order: {
            menu: {
              menuIndex: "asc"
            },
          },
          relations: {
            menu: true
          }
        })
      } else if (pathValues[0] === "username") {
        webmenu1 = await ds.getRepository(Menu)
          .createQueryBuilder('menu')
          .where(qb => {
            const subQuery = qb
              .subQuery()
              .select('DISTINCT parent_id')
              .from(entMenu, 'a')
              .innerJoin(entMenuClass, 'b', 'a.menuId = b.menuId')
              .innerJoin(entUser, 'c', 'b.userClass = c.regType')
              .where('c.userName = :uname', { uname: p })
              .getQuery();

            return `menu.menuId IN ${subQuery}`;
          })
          .orderBy('menu.menuIndex').getMany()

        webmenu2 = await rep.find({
          where: {
            menu: {
              menuLevel: "2"
            },
            user: {
              userName: `${p}`
            }
          },
          order: {
            menu: {
              menuIndex: "asc"
            },
          },
          relations: {
            menu: true,
            user: true
          }
        })
      }

      await db.disconnect()

      const datamenu = [];
      webmenu1.map(async (data1) => {

        const hasChild = await webmenu2.filter((data2) => data2.menu.parentId === data1.menuId)

        const datas: DataMenu = {
          title: data1.title,
          path: data1.path,
          children: []
        }

        if (hasChild.length > 0) {
          hasChild.map(async (child2) => {
            const datas2: DataMenuChild = {
              title: child2.menu.title,
              path: child2.menu.path,
            }

            await datas.children.push(datas2);
          });
        }

        datamenu.push(datas);

      });

      const resmsg = await datamenu;


      errorCode = "200"
      message = "succeed"
      data = resmsg
      status = true

    } catch (error) {
      console.log(error)
      errorCode = "500"
      message = "failed"
      status = false
    } finally {
      const resJson: ApiResponseType = {
        errorCode: errorCode,
        message: message,
        data: data,
        status: status,
      }

      return res.status(200).end(JSON.stringify(resJson))
    }
  }

  return res.status(200).end()
}
