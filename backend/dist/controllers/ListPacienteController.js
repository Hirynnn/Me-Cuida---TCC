"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListPacienteController = void 0;
const ListPacientesService_1 = require("../services/ListPacientesService");
class ListPacienteController {
    async handle(req, res) {
        const userId = req.userId;
        const service = new ListPacientesService_1.ListPacienteService();
        const pacientes = await service.execute(userId);
        return res.json({ data: pacientes });
    }
}
exports.ListPacienteController = ListPacienteController;
