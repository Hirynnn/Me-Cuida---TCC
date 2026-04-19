"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcluirTarefaService = void 0;
const client_1 = require("../prisma/client");
class ConcluirTarefaService {
    async execute(tarefaId, userId) {
        // buscar tarefa + paciente
        const tarefa = await client_1.prisma.tarefa.findUnique({
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
        await client_1.prisma.tarefa.update({
            where: { id: tarefaId },
            data: {
                concluida: true,
            },
        });
        const historico = await client_1.prisma.historicoTarefa.create({
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
exports.ConcluirTarefaService = ConcluirTarefaService;
