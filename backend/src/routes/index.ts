import { Router } from "express";
import { auth } from "../middlewares/auth";
import { prisma } from "../prisma/client";
import { CreateUsuarioController } from "../controllers/CreateUsuarioController";
import { AuthUsuarioController } from "../controllers/AuthUsuarioController";
import { CreatePacienteController } from "../controllers/CreatePacienteController";
const createPacienteController = new CreatePacienteController();
import { ListPacienteController } from "../controllers/ListPacienteController";
import { UpdatePacienteController } from "../controllers/UpdatePacienteController";
import { DeletePacienteController } from "../controllers/DeletePacienteController";

export const routes = Router();
const createUsuarioController = new CreateUsuarioController();
const authUsuarioController = new AuthUsuarioController();
const listPacienteController = new ListPacienteController();
const updatePacienteController = new UpdatePacienteController();
const deletePacienteController = new DeletePacienteController();

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

routes.get("/perfil", auth, (req, res) => {
  return res.json({
    message: "Você está logado",
    userId: req.userId,
  });
});

routes.post("/pacientes", auth, (req, res) => {
  return createPacienteController.handle(req, res);
});

routes.get("/pacientes", auth, (req, res) => {
  return listPacienteController.handle(req, res);
});

routes.put("/pacientes/:id", auth, (req, res) => {
  return updatePacienteController.handle(req, res);
});

routes.delete("/pacientes/:id", auth, (req, res) => {
  return deletePacienteController.handle(req, res);
});
