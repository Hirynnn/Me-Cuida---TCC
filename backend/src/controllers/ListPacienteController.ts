import { Request, Response } from "express";
import { ListPacienteService } from "../services/ListPacientesService";

export class ListPacienteController {
  async handle(req: Request, res: Response) {
    const userId = req.userId;

    const service = new ListPacienteService();

    const pacientes = await service.execute(userId);

    return res.json({ data: pacientes });
  }
}
