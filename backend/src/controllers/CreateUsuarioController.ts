import { Request, Response } from "express";
import { CreateUsuarioService } from "../services/CreateServiceUsuario";
export class CreateUsuarioController {
  async handle(req: Request, res: Response) {
    const { nome, email, senha } = req.body;

    const service = new CreateUsuarioService();

    const usuario = await service.execute(nome, email, senha);

    return res.json(usuario);
  }
}
