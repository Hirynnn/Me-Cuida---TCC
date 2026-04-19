import { Request, Response } from "express";
import { DashboardService } from "../services/DashboardService";

export class DashboardController {
  async handle(req: Request, res: Response) {
    const userId = req.userId;

    const service = new DashboardService();

    const data = await service.execute(userId);

    return res.json({ data: data });
  }
}
