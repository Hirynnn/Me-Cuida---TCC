"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMedicamentoService = void 0;
const client_1 = require("../prisma/client");
class DeleteMedicamentoService {
    async execute(medicamentoId, userId) {
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
        await client_1.prisma.medicamento.delete({
            where: { id: medicamentoId },
        });
    }
}
exports.DeleteMedicamentoService = DeleteMedicamentoService;
