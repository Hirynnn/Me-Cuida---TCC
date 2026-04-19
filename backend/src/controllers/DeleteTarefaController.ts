import { Request, Response } from "express";
import { DeleteTarefaService } from "../services/DeleteTarefaService";

export class DeleteTarefaController {
  async handle(req: Request, res: Response) {
    const { tarefaId } = req.params as { tarefaId: string };
    const userId = req.userId;

    const service = new DeleteTarefaService();

    await service.execute(tarefaId, userId);
    return res.json({ data: "Tarefa deletada com sucesso" });
  }
}
