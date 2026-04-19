import { Request, Response } from "express";
import { UpdateTarefaService } from "../services/UpdateTarefaService";

export class UpdateTarefaController {
  async handle(req: Request, res: Response) {
    const { tarefaId } = req.params as { tarefaId: string };
    const { titulo, descricao, data } = req.body;
    const userId = req.userId;

    const service = new UpdateTarefaService();

    const tarefa = await service.execute(
      tarefaId,
      titulo,
      descricao,
      new Date(data),
      userId,
    );

    return res.json({ data: tarefa });
  }
}
