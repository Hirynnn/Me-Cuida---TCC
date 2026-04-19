import { Request, Response } from "express";
import { AuthUsuarioService } from "../services/AuthUsuarioService";

export class AuthUsuarioController {
  async handle(req: Request, res: Response) {
    const { email, senha } = req.body;

    const service = new AuthUsuarioService();

    const result = await service.execute(email, senha);

    return res.json({ data: result });
  }
}
