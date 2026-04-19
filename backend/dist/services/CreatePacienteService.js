"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePacienteService = void 0;
const client_1 = require("../prisma/client");
class CreatePacienteService {
    async execute(nome, idade, genero, userId) {
        const paciente = await client_1.prisma.paciente.create({
            data: {
                nome,
                idade,
                genero,
                cuidadorId: userId,
            },
        });
        return paciente;
    }
}
exports.CreatePacienteService = CreatePacienteService;
