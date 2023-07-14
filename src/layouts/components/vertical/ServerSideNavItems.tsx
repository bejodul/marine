// ** React Imports
import { useEffect, useState } from "react";

// ** Type Import
import { VerticalNavItemsType } from "src/@core/layouts/types";

import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface SessionNew extends Session {
  menuList?: any;
}

const ServerSideNavItems = () => {
  // ** State
  const [menuItems, setMenuItems] = useState<VerticalNavItemsType>([]);
  const { data: session, status } = useSession();
  const sessionNew: SessionNew = session;

  useEffect(() => {
    if (session && status === "authenticated") {
      const jsonMenu = sessionNew.menuList;
      setMenuItems(jsonMenu as VerticalNavItemsType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //console.log(menuItems);

  return { menuItems };
};

export default ServerSideNavItems;
