import { Request, Response } from "express";
import { CreatePacienteService } from "../services/CreatePacienteService";

export class CreatePacienteController {
  async handle(req: Request, res: Response) {
    const { nome, idade, genero } = req.body;

    const userId = req.userId;

    const service = new CreatePacienteService();

    const paciente = await service.execute(nome, idade, genero, userId);

    return res.json(paciente);
  }
}
