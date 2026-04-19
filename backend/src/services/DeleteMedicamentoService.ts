import { prisma } from "../prisma/client";

export class DeleteMedicamentoService {
  async execute(medicamentoId: string, userId: string) {
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

    await prisma.medicamento.delete({
      where: { id: medicamentoId },
    });
  }
}
