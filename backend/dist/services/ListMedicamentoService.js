"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListMedicamentoService = void 0;
const client_1 = require("../prisma/client");
class ListMedicamentoService {
    async execute(tarefaId, userId) {
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
        const medicamentos = await client_1.prisma.medicamento.findMany({
            where: {
                tarefaId,
            },
        });
        return medicamentos;
    }
}
exports.ListMedicamentoService = ListMedicamentoService;
