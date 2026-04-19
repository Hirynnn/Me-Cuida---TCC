"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTarefaController = void 0;
const UpdateTarefaService_1 = require("../services/UpdateTarefaService");
class UpdateTarefaController {
    async handle(req, res) {
        const { tarefaId } = req.params;
        const { titulo, descricao, data } = req.body;
        const userId = req.userId;
        const service = new UpdateTarefaService_1.UpdateTarefaService();
        const tarefa = await service.execute(tarefaId, titulo, descricao, new Date(data), userId);
        return res.json({ data: tarefa });
    }
}
exports.UpdateTarefaController = UpdateTarefaController;
