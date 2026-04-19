import { Request, Response } from "express";
import { ConcluirTarefaService } from "../services/ConcluirTarefaService";

export class ConcluirTarefaController {
  async handle(req: Request, res: Response) {
    const { tarefaId } = req.params as { tarefaId: string };
    const userId = req.userId;

    const service = new ConcluirTarefaService();

    const historico = await service.execute(tarefaId, userId);

    return res.json({ data: historico });
  }
}
