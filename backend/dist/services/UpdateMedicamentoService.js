"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMedicamentoService = void 0;
const client_1 = require("../prisma/client");
class UpdateMedicamentoService {
    async execute(medicamentoId, nomeRemedio, dosagem, frequencia, userId) {
        const medicamento = await client_1.prisma.medicamento.findUnique({
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
        const atualizado = await client_1.prisma.medicamento.update({
            where: { id: medicamentoId },
            data: {
                nomeRemedio,
                dosagem,
                frequencia,
            },
        });
        return atualizado;
    }
}
exports.UpdateMedicamentoService = UpdateMedicamentoService;
