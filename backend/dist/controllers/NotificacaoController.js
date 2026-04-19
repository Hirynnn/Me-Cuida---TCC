"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificacaoController = void 0;
const NotificacaoService_1 = require("../services/NotificacaoService");
class NotificacaoController {
    async handle(req, res) {
        const userId = req.userId;
        const service = new NotificacaoService_1.NotificacaoService();
        const tarefas = await service.execute(userId);
        return res.json({ data: tarefas });
    }
}
exports.NotificacaoController = NotificacaoController;
