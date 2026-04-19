"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTarefaController = void 0;
const CreateTarefaService_1 = require("../services/CreateTarefaService");
class CreateTarefaController {
    async handle(req, res) {
        const { titulo, descricao, data, pacienteId } = req.body;
        const userId = req.userId;
        const service = new CreateTarefaService_1.CreateTarefaService();
        const tarefa = await service.execute(titulo, descricao, new Date(data), pacienteId, userId);
        return res.json({ data: tarefa });
    }
}
exports.CreateTarefaController = CreateTarefaController;
