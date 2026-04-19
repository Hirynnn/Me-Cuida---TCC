import { Request, Response } from "express";
import { CreateTarefaService } from "../services/CreateTarefaService";

export class CreateTarefaController {
  async handle(req: Request, res: Response) {
    const { titulo, descricao, data, pacienteId } = req.body;
    const userId = req.userId;

    const service = new CreateTarefaService();

    const tarefa = await service.execute(
      titulo,
      descricao,
      new Date(data),
      pacienteId,
      userId,
    );

    return res.json({ data: tarefa });
  }
}
