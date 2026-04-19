import { Request, Response } from "express";
import { NotificacaoService } from "../services/NotificacaoService";

export class NotificacaoController {
  async handle(req: Request, res: Response) {
    const userId = req.userId;

    const service = new NotificacaoService();

    const tarefas = await service.execute(userId);

    return res.json({ data: tarefas });
  }
}
