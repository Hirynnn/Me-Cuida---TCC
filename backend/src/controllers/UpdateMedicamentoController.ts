import { Request, Response } from "express";
import { UpdateMedicamentoService } from "../services/UpdateMedicamentoService";

export class UpdateMedicamentoController {
  async handle(req: Request, res: Response) {
    const { medicamentoId } = req.params as { medicamentoId: string };
    const { nomeRemedio, dosagem, frequencia } = req.body;
    const userId = req.userId;

    const service = new UpdateMedicamentoService();

    const medicamento = await service.execute(
      medicamentoId,
      nomeRemedio,
      dosagem,
      frequencia,
      userId,
    );
    return res.json({ data: medicamento });
  }
}
