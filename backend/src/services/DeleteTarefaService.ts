import { prisma } from "../prisma/client";

export class DeleteTarefaService {
  async execute(tarefaId: string, userId: string) {
    const tarefa = await prisma.tarefa.findUnique({
      where: { id: tarefaId },
      include: { paciente: true },
    });

    if (!tarefa) {
      throw new Error("Tarefa não encontrada");
    }

    if (tarefa.paciente.cuidadorId !== userId) {
      throw new Error("Sem permissão");
    }

    await prisma.tarefa.delete({
      where: { id: tarefaId },
    });
  }
}
