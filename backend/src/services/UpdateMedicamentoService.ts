import { prisma } from "../prisma/client";

export class UpdateMedicamentoService {
  async execute(
    medicamentoId: string,
    nomeRemedio: string,
    dosagem: string,
    frequencia: string,
    userId: string,
  ) {
    const medicamento = await prisma.medicamento.findUnique({
      where: { id: medicamentoId },
      include: {
        tarefa: {
          include: {
            paciente: true,
          },
        },
      },
    });

    if (!medicamento) {
      throw new Error("Medicamento não encontrado");
    }

    if (medicamento.tarefa.paciente.cuidadorId !== userId) {
      throw new Error("Sem permissão");
    }

    const atualizado = await prisma.medicamento.update({
      where: { id: medicamentoId },
      data: {
        nomeRemedio,
        dosagem,
        frequencia,
      },
    });

    return atualizado;
  }
}
