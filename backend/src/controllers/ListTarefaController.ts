import { Request, Response } from "express";
import { ListTarefaService } from "../services/ListTarefaService";

export class ListTarefaController {
  async handle(req: Request, res: Response) {
    const { pacienteId } = req.params as { pacienteId: string };
    const userId = req.userId;

    const service = new ListTarefaService();

    const tarefas = await service.execute(pacienteId, userId);

    return res.json({ data: tarefas });
  }
}
