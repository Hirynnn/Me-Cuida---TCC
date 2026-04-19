"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TarefasDoDiaController = void 0;
const TarefasDoDiaService_1 = require("../services/TarefasDoDiaService");
class TarefasDoDiaController {
    async handle(req, res) {
        const userId = req.userId;
        const service = new TarefasDoDiaService_1.TarefasDoDiaService();
        const tarefas = await service.execute(userId);
        return res.json({ data: tarefas });
    }
}
exports.TarefasDoDiaController = TarefasDoDiaController;
