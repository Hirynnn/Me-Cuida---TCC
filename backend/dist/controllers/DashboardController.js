"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const DashboardService_1 = require("../services/DashboardService");
class DashboardController {
    async handle(req, res) {
        const userId = req.userId;
        const service = new DashboardService_1.DashboardService();
        const data = await service.execute(userId);
        return res.json({ data: data });
    }
}
exports.DashboardController = DashboardController;
