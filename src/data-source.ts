import { DataSource } from "typeorm";

class DataBase {

  private client: DataSource = null;

  constructor(props?: { conName?: string, log?: boolean, entities: any[] }) {

    const { conName = "default", log = false, entities = [] } = props || {}

    if (!this.client) {
      this.client = new DataSource({
        name: conName,
        type: "oracle",
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        connectString: `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_SID}`,
        synchronize: false,
        logging: log,
        entities: entities,
        migrations: [],
        subscribers: [],
        poolSize: 1,

      })
    }
  }

  async connect() {
    return await this.client.initialize()
  }

  async disconnect() {
    return this.client.destroy()
  }

}

export default DataBase;

// export const AppDataSource = new DataSource({
//   type: "oracle",
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   connectString: `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_SID}`,
//   synchronize: false,
//   logging: true,
//   entities: [WebMenu, MasterFasilitas, OpH, Kade, Pkk, Datatemp],
//   migrations: [],
//   subscribers: [],
// })
