"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListPacienteService = void 0;
const client_1 = require("../prisma/client");
class ListPacienteService {
    async execute(userId) {
        const pacientes = await client_1.prisma.paciente.findMany({
            where: {
                cuidadorId: userId,
            },
        });
        return pacientes;
    }
}
exports.ListPacienteService = ListPacienteService;
