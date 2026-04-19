"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePacienteService = void 0;
const client_1 = require("../prisma/client");
class DeletePacienteService {
    async execute(id, userId) {
        const paciente = await client_1.prisma.paciente.findUnique({
            where: { id },
        });
        if (!paciente) {
            throw new Error("Paciente não encontrado");
        }
        if (paciente.cuidadorId !== userId) {
            throw new Error("Sem permissão");
        }
        await client_1.prisma.paciente.delete({
            where: { id },
        });
    }
}
exports.DeletePacienteService = DeletePacienteService;
