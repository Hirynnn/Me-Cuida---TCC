import { prisma } from "../prisma/client";

export class ListMedicamentoService {
  async execute(tarefaId: string, userId: string) {
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

    const medicamentos = await prisma.medicamento.findMany({
      where: {
        tarefaId,
      },
    });

    return medicamentos;
  }
}
