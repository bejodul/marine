import { Session } from "next-auth";

export type SessionExtended = Session & {
  menuList?: any;
  accessToken?: string;
};
