"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTarefaService = void 0;
const client_1 = require("../prisma/client");
class CreateTarefaService {
    async execute(titulo, descricao, data, pacienteId, userId) {
        const paciente = await client_1.prisma.paciente.findUnique({
            where: { id: pacienteId },
        });
        if (!paciente) {
            throw new Error("Paciente não encontrado");
        }
        if (paciente.cuidadorId !== userId) {
            throw new Error("Sem permissão");
        }
        const tarefa = await client_1.prisma.tarefa.create({
            data: {
                titulo,
                descricao,
                data,
                pacienteId,
                recorrente: false,
                tipoTarefa: "geral",
            },
        });
        return tarefa;
    }
}
exports.CreateTarefaService = CreateTarefaService;
