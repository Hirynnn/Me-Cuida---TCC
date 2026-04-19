"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePacienteController = void 0;
const DeletePacienteService_1 = require("../services/DeletePacienteService");
class DeletePacienteController {
    async handle(req, res) {
        const { id } = req.params;
        const userId = req.userId; // 🔥 vem do token
        const service = new DeletePacienteService_1.DeletePacienteService();
        await service.execute(id, userId);
        return res.json({ data: "Paciente deletado com sucesso" });
    }
}
exports.DeletePacienteController = DeletePacienteController;
