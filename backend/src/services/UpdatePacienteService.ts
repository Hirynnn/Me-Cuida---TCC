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
      throw new Error("Paciente não encontrado");
    }

    if (paciente.cuidadorId !== userId) {
      throw new Error("Sem permissão");
    }

    const atualizado = await prisma.paciente.update({
      where: { id },
      data: { nome, idade, genero },
    });

    return atualizado;
  }
}
