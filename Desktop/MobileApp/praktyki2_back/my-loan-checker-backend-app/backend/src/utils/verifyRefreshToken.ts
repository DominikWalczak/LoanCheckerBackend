import jwt from "jsonwebtoken";

export function verifyRefreshToken(token: string): { userId: string, email: string } | null {
  try {
    const decoded = jwt.verify(
      token,
      process.env.REFRESH_SECRET!
    ) as { userId: string, email: string };

    return decoded;
  } catch (err) {
    console.log("Invalid refresh token:", err);
    return null;
  }
}