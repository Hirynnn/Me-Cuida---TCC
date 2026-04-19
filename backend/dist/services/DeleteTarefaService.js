"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTarefaService = void 0;
const client_1 = require("../prisma/client");
class DeleteTarefaService {
    async execute(tarefaId, userId) {
        const tarefa = await client_1.prisma.tarefa.findUnique({
            where: { id: tarefaId },
            include: { paciente: true },
        });
        if (!tarefa) {
            throw new Error("Tarefa não encontrada");
        }
        if (tarefa.paciente.cuidadorId !== userId) {
            throw new Error("Sem permissão");
        }
        await client_1.prisma.tarefa.delete({
            where: { id: tarefaId },
        });
    }
}
exports.DeleteTarefaService = DeleteTarefaService;
