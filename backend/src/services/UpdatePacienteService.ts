import { AppError } from "../errors/AppError";
import { prisma } from "../prisma/client";

export class UpdatePacienteService {
  async execute(
    id: string,
    nome: string,
    idade: number,
    genero: string,
    userId: string,
  ) {
    const paciente = await prisma.paciente.findUnique({
      where: { id },
    });

    if (!paciente) {
      throw new AppError("Paciente não encontrado", 404);
    }
    if (paciente.cuidadorId !== userId) {
      throw new AppError("Sem permissão", 403);
    }

    const atualizado = await prisma.paciente.update({
      where: { id },
      data: { nome, idade, genero },
    });

    return atualizado;
  }
}
