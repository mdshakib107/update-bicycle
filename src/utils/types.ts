// types.ts

import { ReactNode } from "react";

export type TRoute = {
  path: string;
  element: ReactNode;
};
export type TPathItem = {
    name: string;
    path?: string;
    element: ReactNode;
  };
  export type TUserPath = {
    name: string;
    path?: string;
    element?: ReactNode;
    children?: {
      name?: string;
      path?: string;
      element: ReactNode;
    }[];
  };
  
export type TSidebarItem =
| {
  
    key: string;
    label: ReactNode;
    children?: TSidebarItem[];
  }
| undefined;

export type TResponse<T> = {
  data: T;
  success: boolean;
  message?: string;
};

