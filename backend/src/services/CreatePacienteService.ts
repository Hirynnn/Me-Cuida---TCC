import { prisma } from "../prisma/client";

export class CreatePacienteService {
  async execute(nome: string, idade: number, genero: string, userId: string) {
    const paciente = await prisma.paciente.create({
      data: {
        nome,
        idade,
        genero,
        cuidadorId: userId,
      },
    });

    return paciente;
  }
}
