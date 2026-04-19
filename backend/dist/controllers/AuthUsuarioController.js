"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUsuarioController = void 0;
const AuthUsuarioService_1 = require("../services/AuthUsuarioService");
class AuthUsuarioController {
    async handle(req, res) {
        const { email, senha } = req.body;
        const service = new AuthUsuarioService_1.AuthUsuarioService();
        const result = await service.execute(email, senha);
        return res.json({ data: result });
    }
}
exports.AuthUsuarioController = AuthUsuarioController;
