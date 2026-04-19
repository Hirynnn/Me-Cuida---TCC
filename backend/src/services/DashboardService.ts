import { prisma } from "../prisma/client";

export class DashboardService {
  async execute(userId: string) {
    const totalPacientes = await prisma.paciente.count({
      where: {
        cuidadorId: userId,
      },
    });

    const tarefas = await prisma.tarefa.findMany({
      where: {
        paciente: {
          cuidadorId: userId,
        },
      },
    });

    const totalTarefas = tarefas.length;

    const tarefasConcluidas = tarefas.filter((t) => t.concluida).length;
    const tarefasPendentes = tarefas.filter((t) => !t.concluida).length;

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const amanha = new Date(hoje);
    amanha.setDate(amanha.getDate() + 1);

    const tarefasHoje = await prisma.tarefa.count({
      where: {
        data: {
          gte: hoje,
          lt: amanha,
        },
        paciente: {
          cuidadorId: userId,
        },
      },
    });

    return {
      totalPacientes,
      totalTarefas,
      tarefasConcluidas,
      tarefasPendentes,
      tarefasHoje,
    };
  }
}
