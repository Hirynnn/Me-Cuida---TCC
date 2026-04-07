import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface Payload {
  id: string;
}

export function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não enviado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as Payload;

    req.userId = decoded.id;

    return next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
}
