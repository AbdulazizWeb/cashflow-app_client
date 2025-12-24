import { jwtDecode } from "jwt-decode";

export type JwtClaims = {
  sub?: string;
  role?: string;
  exp?: number;
};

export function decodeJwt(token: string): JwtClaims | null {
  try {
    return jwtDecode<JwtClaims>(token);
  } catch {
    return null;
  }
}
