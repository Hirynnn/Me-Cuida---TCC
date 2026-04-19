"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMedicamentoService = void 0;
const client_1 = require("../prisma/client");
class CreateMedicamentoService {
    async execute(nomeRemedio, dosagem, frequencia, tarefaId, userId) {
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
        const medicamento = await client_1.prisma.medicamento.create({
            data: {
                nomeRemedio,
                dosagem,
                frequencia,
                tarefaId,
            },
        });
        return medicamento;
    }
}
exports.CreateMedicamentoService = CreateMedicamentoService;
