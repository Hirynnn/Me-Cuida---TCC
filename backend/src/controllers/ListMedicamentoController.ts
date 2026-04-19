import { Request, Response } from "express";
import { ListMedicamentoService } from "../services/ListMedicamentoService";

export class ListMedicamentoController {
  async handle(req: Request, res: Response) {
    const { tarefaId } = req.params as { tarefaId: string };
    const userId = req.userId;

    const service = new ListMedicamentoService();

    const medicamentos = await service.execute(tarefaId, userId);

    return res.json({ data: medicamentos });
  }
}
