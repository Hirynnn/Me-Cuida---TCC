import { prisma } from "../prisma/client";

export class TarefasDoDiaService {
  async execute(userId: string) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const amanha = new Date(hoje);
    amanha.setDate(amanha.getDate() + 1);

    const tarefas = await prisma.tarefa.findMany({
      where: {
        data: {
          gte: hoje,
          lt: amanha,
        },
        paciente: {
          cuidadorId: userId,
        },
      },
      include: {
        paciente: true,
        medicamentos: true,
      },
      orderBy: {
        data: "asc",
      },
    });

    const resultado: any = {};

    tarefas.forEach((tarefa) => {
      const nomePaciente = tarefa.paciente.nome;

      if (!resultado[nomePaciente]) {
        resultado[nomePaciente] = [];
      }

      resultado[nomePaciente].push({
        id: tarefa.id,
        titulo: tarefa.titulo,
        data: tarefa.data,
        concluida: tarefa.concluida,
        medicamentos: tarefa.medicamentos,
      });
    });

    return Object.keys(resultado).map((paciente) => ({
      paciente,
      tarefas: resultado[paciente],
    }));
  }
}
