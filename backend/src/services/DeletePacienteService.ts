import { prisma } from "../prisma/client";

export class DeletePacienteService {
  async execute(id: string, userId: string) {
    const paciente = await prisma.paciente.findUnique({
      where: { id },
    });

    if (!paciente) {
      throw new Error("Paciente não encontrado");
    }

    if (paciente.cuidadorId !== userId) {
      throw new Error("Sem permissão");
    }

    await prisma.paciente.delete({
      where: { id },
    });
  }
}
