"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListMedicamentoController = void 0;
const ListMedicamentoService_1 = require("../services/ListMedicamentoService");
class ListMedicamentoController {
    async handle(req, res) {
        const { tarefaId } = req.params;
        const userId = req.userId;
        const service = new ListMedicamentoService_1.ListMedicamentoService();
        const medicamentos = await service.execute(tarefaId, userId);
        return res.json({ data: medicamentos });
    }
}
exports.ListMedicamentoController = ListMedicamentoController;
