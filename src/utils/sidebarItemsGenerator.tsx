import { TSidebarItem, TUserPath } from './types';
import { NavLink } from 'react-router-dom';

export const sidebarItemsGenerator = (items: TUserPath[], role: string) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {

    //* Direct routes
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/dashboard/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }

    // if (item.children) {
    //   acc.push({
    //     key: item.name,
    //     label: item.name,
    //     children: item.children.map((child) => {
    //       if (child.name) {
    //         return {
    //           key: child.name,
    //           label: (
    //             <NavLink to={`/dashboard/${role}/${child.path}`}>{child.name}</NavLink>
    //           ),
    //         };
    //       }
    //     }),
    //   });
    // }

    //* Nested routes
    if (item.children) {
      const validChildren = item.children
        .filter((child) => child.name && child.path)
        .map((child) => ({
          key: child.name!,
          label: (
            <NavLink to={`/dashboard/${role}/${child.path}`}>
              {child.name}
            </NavLink>
          ),
        }));

      if (validChildren.length > 0) {
        acc.push({
          key: item.name,
          label: item.name,
          children: validChildren,
        });
      }
    }

    return acc;
  }, []);

  return sidebarItems;
};