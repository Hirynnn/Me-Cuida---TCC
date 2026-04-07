import { prisma } from "../prisma/client";

export class ListPacienteService {
  async execute(userId: string) {
    const pacientes = await prisma.paciente.findMany({
      where: {
        cuidadorId: userId,
      },
    });

    return pacientes;
  }
}
