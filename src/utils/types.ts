// types.ts

import { ItemData } from "@/components/shared/ItemsCard";
import { ReactNode } from "react";
import { JSX } from "react/jsx-runtime";

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

export type TSidebarItem = {
  key: string;
  label: ReactNode;
  children?: TSidebarItem[];
};

export type TResponse<T> = {
  data: T;
  success: boolean;
  message?: string;
};

//User type definition
// This type is used to define the structure of a user object in the application. move it as a separate file if needed.
export type TUser = {
  data: {
    _id: string; // MongoDB ObjectId
    name: string;
    email: string;
    role: "customer" | "admin";
    status: "active" | "inactive" | "banned"; // as UserStatus enum
    needsPasswordChange: boolean;
    passwordChangedAt?: string; // Optional field
  };
};
export interface TUser2 {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
  status: "active" | "inactive" | "banned";
  needsPasswordChange: boolean;
  passwordChangedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  image?: string;
}

// (Ordered Item)
export interface OrderedItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

// (Main Order Type)
export interface Order {
  id: string;
  products: OrderedItem[];
  userId: string;
  totalPrice: number;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  updatedAt?: string;
}

// interface for get products api response
export interface ApiResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  data: {
    map?(arg0: (d: ItemData) => JSX.Element): import("react").ReactNode;
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
    result: ItemData[]; // An array of your `ItemData` objects
  };
}

// interface for get products by id api response
export interface ApiResponseById {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  data: ItemData; // An array of your `ItemData` objects
}
