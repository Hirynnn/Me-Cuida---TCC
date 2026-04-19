"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTarefaController = void 0;
const DeleteTarefaService_1 = require("../services/DeleteTarefaService");
class DeleteTarefaController {
    async handle(req, res) {
        const { tarefaId } = req.params;
        const userId = req.userId;
        const service = new DeleteTarefaService_1.DeleteTarefaService();
        await service.execute(tarefaId, userId);
        return res.json({ data: "Tarefa deletada com sucesso" });
    }
}
exports.DeleteTarefaController = DeleteTarefaController;
