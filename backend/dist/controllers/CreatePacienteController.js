"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePacienteController = void 0;
const CreatePacienteService_1 = require("../services/CreatePacienteService");
class CreatePacienteController {
    async handle(req, res) {
        const { nome, idade, genero } = req.body;
        const userId = req.userId;
        const service = new CreatePacienteService_1.CreatePacienteService();
        const paciente = await service.execute(nome, idade, genero, userId);
        return res.json({ data: paciente });
    }
}
exports.CreatePacienteController = CreatePacienteController;
