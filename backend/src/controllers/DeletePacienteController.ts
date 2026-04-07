import { Request, Response } from "express";
import { DeletePacienteService } from "../services/DeletePacienteService";

export class DeletePacienteController {
  async handle(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const userId = req.userId; // 🔥 vem do token

    const service = new DeletePacienteService();

    await service.execute(id, userId);

    return res.json({ message: "Paciente deletado com sucesso" });
  }
}
