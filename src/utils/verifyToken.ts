import { jwtDecode } from "jwt-decode";
import { TUserFromToken } from "@/redux/features/auth/authSlice";

export const verifyToken = (token: string): TUserFromToken | null => {
  try {
    const decoded = jwtDecode<TUserFromToken>(token);
    return decoded;
  } catch (error) {
    console.error("Token decoding failed:", error);
    return null;
  }
};

/* 
export const verifyToken = (token: string) => {
    try {
        const decoded = jwtDecode(token);
        return decoded;
    } catch (error) {
        console.error('Token decoding failed:', error);
        return null;
    }
}
*/