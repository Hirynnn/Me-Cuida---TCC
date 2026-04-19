import { prisma } from "../prisma/client";

export class ConcluirTarefaService {
  async execute(tarefaId: string, userId: string) {
    // buscar tarefa + paciente
    const tarefa = await prisma.tarefa.findUnique({
      where: { id: tarefaId },
      include: {
        paciente: true,
      },
    });

    if (!tarefa) {
      throw new Error("Tarefa não encontrada");
    }

    if (tarefa.paciente.cuidadorId !== userId) {
      throw new Error("Sem permissão");
    }

    await prisma.tarefa.update({
      where: { id: tarefaId },
      data: {
        concluida: true,
      },
    });

    const historico = await prisma.historicoTarefa.create({
      data: {
        tarefaId: tarefaId,
        usuarioId: userId,
        dataExecucao: new Date(),
        observacao: "Tarefa concluída",
      },
    });

    return historico;
  }
}
