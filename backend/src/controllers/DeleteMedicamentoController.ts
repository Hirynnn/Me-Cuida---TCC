import { Request, Response } from "express";
import { DeleteMedicamentoService } from "../services/deleteMedicamentoService";

export class DeleteMedicamentoController {
  async handle(req: Request, res: Response) {
    const { medicamentoId } = req.params as { medicamentoId: string };
    const userId = req.userId;

    const service = new DeleteMedicamentoService();

    await service.execute(medicamentoId, userId);

    return res.json({ data: "Medicamento deletado com sucesso" });
  }
}
