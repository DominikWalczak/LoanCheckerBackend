import jwt from "jsonwebtoken";

export function generateAccessToken(userId: string, email: string) {
  console.log(process.env.ACCESS_SECRET);
  return jwt.sign(
    { userId, email },
    process.env.ACCESS_SECRET!,
    { expiresIn: "15m" }
  );
}

export function generateRefreshToken(userId: string, email: string) {
  console.log(process.env.REFRESH_SECRET);
  return jwt.sign(
    { userId, email },
    process.env.REFRESH_SECRET!,
    { expiresIn: "30d" }
  );
}