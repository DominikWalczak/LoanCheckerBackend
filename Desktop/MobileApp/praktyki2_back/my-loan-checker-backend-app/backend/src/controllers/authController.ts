import { Request, Response } from "express";
import { verifyRefreshToken } from "../utils/verifyRefreshToken";
import { generateAccessToken } from "../utils/generateTokens";

export async function refreshTokenController(req: Request, res: Response) {
    const { refreshToken } = req.body

    if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token required" });
    }

  const decoded = verifyRefreshToken(refreshToken);

  if (!decoded) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }

  const { userId, email } = decoded;

  const newAccessToken = generateAccessToken(userId, email);

  return res.status(200).json({
    accessToken: newAccessToken,
  });
}