"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTarefaController = void 0;
const ListTarefaService_1 = require("../services/ListTarefaService");
class ListTarefaController {
    async handle(req, res) {
        const { pacienteId } = req.params;
        const userId = req.userId;
        const service = new ListTarefaService_1.ListTarefaService();
        const tarefas = await service.execute(pacienteId, userId);
        return res.json({ data: tarefas });
    }
}
exports.ListTarefaController = ListTarefaController;
