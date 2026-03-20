import { Router } from "express";

import { prisma } from "../prisma/client";
import { CreateUsuarioController } from "../controllers/CreateUsuarioController";
import { AuthUsuarioController } from "../controllers/AuthUsuarioController";
export const routes = Router();
const createUsuarioController = new CreateUsuarioController();
const authUsuarioController = new AuthUsuarioController();

routes.get("/", (req, res) => {
  res.send("API MeCuida funcionando 🚀");
});

routes.get("/test-db", async (req, res) => {
  const users = await prisma.usuario.findMany();

  res.json(users);
});

routes.get("/test-db", async (req, res) => {
  const users = await prisma.usuario.findMany();

  res.json(users);
});

routes.post("/usuarios", (req, res) => {
  return createUsuarioController.handle(req, res);
});

routes.post("/login", (req, res) => {
  return authUsuarioController.handle(req, res);
});
