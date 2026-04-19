import { Request, Response } from "express";
import { UpdatePacienteService } from "../services/UpdatePacienteService";

export class UpdatePacienteController {
  async handle(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const { nome, idade, genero } = req.body;

    const userId = req.userId;

    const service = new UpdatePacienteService();

    const paciente = await service.execute(id, nome, idade, genero, userId);

    return res.json({ data: paciente });
  }
}
