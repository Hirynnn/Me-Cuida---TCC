"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMedicamentoController = void 0;
const CreateMedicamentoService_1 = require("../services/CreateMedicamentoService");
class CreateMedicamentoController {
    async handle(req, res) {
        const { nomeRemedio, dosagem, frequencia, tarefaId } = req.body;
        const userId = req.userId;
        const service = new CreateMedicamentoService_1.CreateMedicamentoService();
        const medicamento = await service.execute(nomeRemedio, dosagem, frequencia, tarefaId, userId);
        return res.json({ data: medicamento });
    }
}
exports.CreateMedicamentoController = CreateMedicamentoController;
