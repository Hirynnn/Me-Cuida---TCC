import { prisma } from "../prisma/client";

export class CreateMedicamentoService {
  async execute(
    nomeRemedio: string,
    dosagem: string,
    frequencia: string,
    tarefaId: string,
    userId: string,
  ) {
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

    const medicamento = await prisma.medicamento.create({
      data: {
        nomeRemedio,
        dosagem,
        frequencia,
        tarefaId,
      },
    });

    return medicamento;
  }
}
