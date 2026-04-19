import { prisma } from "../prisma/client";

export class ListTarefaService {
  async execute(pacienteId: string, userId: string) {
    const paciente = await prisma.paciente.findUnique({
      where: { id: pacienteId },
    });

    if (!paciente) {
      throw new Error("Paciente não encontrado");
    }

    if (paciente.cuidadorId !== userId) {
      throw new Error("Sem permissão");
    }

    const tarefas = await prisma.tarefa.findMany({
      where: {
        pacienteId,
      },
    });

    return tarefas;
  }
}
