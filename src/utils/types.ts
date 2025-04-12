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

//User type definition
// This type is used to define the structure of a user object in the application. move it as a separate file if needed.
export type TUser = {
  _id: string; // MongoDB ObjectId
  name: string;
  email: string;
  role: "customer" | "admin";
  status: "active" | "inactive" | "banned"; // as UserStatus enum
  needsPasswordChange: boolean;
  passwordChangedAt?: string; // Optional field
};

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
