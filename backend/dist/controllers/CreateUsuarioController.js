"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsuarioController = void 0;
const CreateServiceUsuario_1 = require("../services/CreateServiceUsuario");
class CreateUsuarioController {
    async handle(req, res) {
        const { nome, email, senha } = req.body;
        const service = new CreateServiceUsuario_1.CreateUsuarioService();
        const usuario = await service.execute(nome, email, senha);
        return res.json({ data: usuario });
    }
}
exports.CreateUsuarioController = CreateUsuarioController;
