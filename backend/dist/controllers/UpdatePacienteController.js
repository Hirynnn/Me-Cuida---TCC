"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePacienteController = void 0;
const UpdatePacienteService_1 = require("../services/UpdatePacienteService");
class UpdatePacienteController {
    async handle(req, res) {
        const { id } = req.params;
        const { nome, idade, genero } = req.body;
        const userId = req.userId;
        const service = new UpdatePacienteService_1.UpdatePacienteService();
        const paciente = await service.execute(id, nome, idade, genero, userId);
        return res.json({ data: paciente });
    }
}
exports.UpdatePacienteController = UpdatePacienteController;
