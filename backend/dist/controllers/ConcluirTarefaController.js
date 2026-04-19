"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcluirTarefaController = void 0;
const ConcluirTarefaService_1 = require("../services/ConcluirTarefaService");
class ConcluirTarefaController {
    async handle(req, res) {
        const { tarefaId } = req.params;
        const userId = req.userId;
        const service = new ConcluirTarefaService_1.ConcluirTarefaService();
        const historico = await service.execute(tarefaId, userId);
        return res.json({ data: historico });
    }
}
exports.ConcluirTarefaController = ConcluirTarefaController;
