"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTarefaService = void 0;
const client_1 = require("../prisma/client");
class UpdateTarefaService {
    async execute(tarefaId, titulo, descricao, data, userId) {
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
        const atualizada = await client_1.prisma.tarefa.update({
            where: { id: tarefaId },
            data: {
                titulo,
                descricao,
                data,
            },
        });
        return atualizada;
    }
}
exports.UpdateTarefaService = UpdateTarefaService;
