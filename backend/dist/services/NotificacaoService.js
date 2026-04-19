"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificacaoService = void 0;
const client_1 = require("../prisma/client");
class NotificacaoService {
    async execute(userId) {
        const agora = new Date();
        const limite = new Date();
        limite.setMinutes(agora.getMinutes() + 30);
        const tarefas = await client_1.prisma.tarefa.findMany({
            where: {
                data: {
                    gte: agora,
                    lte: limite,
                },
                concluida: false,
                paciente: {
                    cuidadorId: userId,
                },
            },
            include: {
                paciente: true,
            },
        });
        if (tarefas.length === 0)
            return [];
        const tarefasIds = tarefas.map((t) => t.id);
        const notificadas = await client_1.prisma.notificacao.findMany({
            where: {
                tarefaId: { in: tarefasIds },
                usuarioId: userId,
            },
        });
        const notificadasIds = notificadas.map((n) => n.tarefaId);
        const novasTarefas = tarefas.filter((t) => !notificadasIds.includes(t.id));
        if (novasTarefas.length > 0) {
            await client_1.prisma.notificacao.createMany({
                data: novasTarefas.map((t) => ({
                    tarefaId: t.id,
                    usuarioId: userId,
                })),
            });
        }
        const resposta = novasTarefas.map((t) => ({
            mensagem: `${t.titulo} - ${t.paciente.nome}`,
            horario: t.data,
            tarefaId: t.id,
        }));
        return resposta;
    }
}
exports.NotificacaoService = NotificacaoService;
