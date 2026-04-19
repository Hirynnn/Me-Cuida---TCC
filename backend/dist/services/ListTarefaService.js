"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTarefaService = void 0;
const client_1 = require("../prisma/client");
class ListTarefaService {
    async execute(pacienteId, userId) {
        const paciente = await client_1.prisma.paciente.findUnique({
            where: { id: pacienteId },
        });
        if (!paciente) {
            throw new Error("Paciente não encontrado");
        }
        if (paciente.cuidadorId !== userId) {
            throw new Error("Sem permissão");
        }
        const tarefas = await client_1.prisma.tarefa.findMany({
            where: {
                pacienteId,
            },
        });
        return tarefas;
    }
}
exports.ListTarefaService = ListTarefaService;
