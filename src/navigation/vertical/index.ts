import { useEffect, useState } from 'react';
import { VerticalNavItemsType } from '../../@core/layouts/types';
import { ApiResponseType } from 'src/types/api/responseType';

const Navigation = (): VerticalNavItemsType => {
  const [menuData, setMenuData] = useState<VerticalNavItemsType>()

  const fetchMenuData = async () => {
    try {
      const apiUrl = process.env.API_URL

      const res = await fetch(`${apiUrl}/api/menu?l=a`);

      const data: ApiResponseType = await res.json()

      setMenuData(data.data)

    } catch (error) {
      console.log('error:', error.message)
    }
  }

  useEffect(() => {
    fetchMenuData()
  }, [])

  return menuData
};

export default Navigation;
