"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMedicamentoController = void 0;
const deleteMedicamentoService_1 = require("../services/deleteMedicamentoService");
class DeleteMedicamentoController {
    async handle(req, res) {
        const { medicamentoId } = req.params;
        const userId = req.userId;
        const service = new deleteMedicamentoService_1.DeleteMedicamentoService();
        await service.execute(medicamentoId, userId);
        return res.json({ data: "Medicamento deletado com sucesso" });
    }
}
exports.DeleteMedicamentoController = DeleteMedicamentoController;
