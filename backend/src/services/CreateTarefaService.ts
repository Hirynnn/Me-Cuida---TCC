import { prisma } from "../prisma/client";

export class CreateTarefaService {
  async execute(
    titulo: string,
    descricao: string,
    data: Date,
    pacienteId: string,
    userId: string,
  ) {
    const paciente = await prisma.paciente.findUnique({
      where: { id: pacienteId },
    });

    if (!paciente) {
      throw new Error("Paciente não encontrado");
    }

    if (paciente.cuidadorId !== userId) {
      throw new Error("Sem permissão");
    }

    const tarefa = await prisma.tarefa.create({
      data: {
        titulo,
        descricao,
        data,
        pacienteId,
        recorrente: false,
        tipoTarefa: "geral",
      },
    });

    return tarefa;
  }
}
