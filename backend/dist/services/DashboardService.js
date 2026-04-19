"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const client_1 = require("../prisma/client");
class DashboardService {
    async execute(userId) {
        const totalPacientes = await client_1.prisma.paciente.count({
            where: {
                cuidadorId: userId,
            },
        });
        const tarefas = await client_1.prisma.tarefa.findMany({
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
        const tarefasHoje = await client_1.prisma.tarefa.count({
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
exports.DashboardService = DashboardService;
