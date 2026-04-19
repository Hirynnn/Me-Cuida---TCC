"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePacienteService = void 0;
const AppError_1 = require("../errors/AppError");
const client_1 = require("../prisma/client");
class UpdatePacienteService {
    async execute(id, nome, idade, genero, userId) {
        const paciente = await client_1.prisma.paciente.findUnique({
            where: { id },
        });
        if (!paciente) {
            throw new AppError_1.AppError("Paciente não encontrado", 404);
        }
        if (paciente.cuidadorId !== userId) {
            throw new AppError_1.AppError("Sem permissão", 403);
        }
        const atualizado = await client_1.prisma.paciente.update({
            where: { id },
            data: { nome, idade, genero },
        });
        return atualizado;
    }
}
exports.UpdatePacienteService = UpdatePacienteService;
