import { Request, Response } from "express";
import { TarefasDoDiaService } from "../services/TarefasDoDiaService";

export class TarefasDoDiaController {
  async handle(req: Request, res: Response) {
    const userId = req.userId;

    const service = new TarefasDoDiaService();

    const tarefas = await service.execute(userId);

    return res.json({ data: tarefas });
  }
}
