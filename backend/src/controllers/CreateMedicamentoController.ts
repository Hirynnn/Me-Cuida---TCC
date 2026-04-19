import { Request, Response } from "express";
import { CreateMedicamentoService } from "../services/CreateMedicamentoService";

export class CreateMedicamentoController {
  async handle(req: Request, res: Response) {
    const { nomeRemedio, dosagem, frequencia, tarefaId } = req.body;
    const userId = req.userId;

    const service = new CreateMedicamentoService();

    const medicamento = await service.execute(
      nomeRemedio,
      dosagem,
      frequencia,
      tarefaId,
      userId,
    );

    return res.json({ data: medicamento });
  }
}
