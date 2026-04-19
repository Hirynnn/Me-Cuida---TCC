import { prisma } from "../prisma/client";

export class UpdateTarefaService {
  async execute(
    tarefaId: string,
    titulo: string,
    descricao: string,
    data: Date,
    userId: string,
  ) {
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

    const atualizada = await prisma.tarefa.update({
      where: { id: tarefaId },
      data: {
        titulo,
        descricao,
        data,
      },
    });

    return atualizada;
  }
}
