"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMedicamentoController = void 0;
const UpdateMedicamentoService_1 = require("../services/UpdateMedicamentoService");
class UpdateMedicamentoController {
    async handle(req, res) {
        const { medicamentoId } = req.params;
        const { nomeRemedio, dosagem, frequencia } = req.body;
        const userId = req.userId;
        const service = new UpdateMedicamentoService_1.UpdateMedicamentoService();
        const medicamento = await service.execute(medicamentoId, nomeRemedio, dosagem, frequencia, userId);
        return res.json({ data: medicamento });
    }
}
exports.UpdateMedicamentoController = UpdateMedicamentoController;
