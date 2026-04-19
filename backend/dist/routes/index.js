"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const client_1 = require("../prisma/client");
const CreateUsuarioController_1 = require("../controllers/CreateUsuarioController");
const AuthUsuarioController_1 = require("../controllers/AuthUsuarioController");
const CreatePacienteController_1 = require("../controllers/CreatePacienteController");
const createPacienteController = new CreatePacienteController_1.CreatePacienteController();
const ListPacienteController_1 = require("../controllers/ListPacienteController");
const UpdatePacienteController_1 = require("../controllers/UpdatePacienteController");
const DeletePacienteController_1 = require("../controllers/DeletePacienteController");
const ListTarefaController_1 = require("../controllers/ListTarefaController");
const ConcluirTarefaController_1 = require("../controllers/ConcluirTarefaController");
const CreateTarefaController_1 = require("../controllers/CreateTarefaController");
const UpdateTarefaController_1 = require("../controllers/UpdateTarefaController");
const DeleteTarefaController_1 = require("../controllers/DeleteTarefaController");
const CreateMedicamentoController_1 = require("../controllers/CreateMedicamentoController");
const ListMedicamentoController_1 = require("../controllers/ListMedicamentoController");
const UpdateMedicamentoController_1 = require("../controllers/UpdateMedicamentoController");
const DeleteMedicamentoController_1 = require("../controllers/DeleteMedicamentoController");
const DashboardController_1 = require("../controllers/DashboardController");
const TarefasDoDiaController_1 = require("../controllers/TarefasDoDiaController");
const NotificacaoController_1 = require("../controllers/NotificacaoController");
exports.routes = (0, express_1.Router)();
const createUsuarioController = new CreateUsuarioController_1.CreateUsuarioController();
const authUsuarioController = new AuthUsuarioController_1.AuthUsuarioController();
const listPacienteController = new ListPacienteController_1.ListPacienteController();
const updatePacienteController = new UpdatePacienteController_1.UpdatePacienteController();
const deletePacienteController = new DeletePacienteController_1.DeletePacienteController();
const listTarefaController = new ListTarefaController_1.ListTarefaController();
const concluirTarefaController = new ConcluirTarefaController_1.ConcluirTarefaController();
const createTarefaController = new CreateTarefaController_1.CreateTarefaController();
const updateTarefaController = new UpdateTarefaController_1.UpdateTarefaController();
const deleteTarefaController = new DeleteTarefaController_1.DeleteTarefaController();
const createMedicamentoController = new CreateMedicamentoController_1.CreateMedicamentoController();
const listMedicamentoController = new ListMedicamentoController_1.ListMedicamentoController();
const updateMedicamentoController = new UpdateMedicamentoController_1.UpdateMedicamentoController();
const deleteMedicamentoController = new DeleteMedicamentoController_1.DeleteMedicamentoController();
const dashboardController = new DashboardController_1.DashboardController();
const tarefasDoDiaController = new TarefasDoDiaController_1.TarefasDoDiaController();
const notificacaoController = new NotificacaoController_1.NotificacaoController();
exports.routes.get("/", (req, res) => {
    res.send("API MeCuida funcionando 🚀");
});
exports.routes.get("/test-db", async (req, res) => {
    const users = await client_1.prisma.usuario.findMany();
    res.json(users);
});
/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Criar novo usuário
 *     description: Cria um novo usuário (cuidador) no sistema
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos ou email já existe
 */
exports.routes.post("/usuarios", (req, res) => {
    return createUsuarioController.handle(req, res);
});
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 */
exports.routes.post("/login", (req, res) => {
    return authUsuarioController.handle(req, res);
});
/**
 * @swagger
 * /perfil:
 *   get:
 *     summary: Obter perfil do usuário
 *     description: Retorna os dados do perfil do usuário autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil recuperado com sucesso
 *       401:
 *         description: Não autenticado
 */
exports.routes.get("/perfil", auth_1.auth, (req, res) => {
    return res.json({
        message: "Você está logado",
        userId: req.userId,
    });
});
/**
 * @swagger
 * /pacientes:
 *   post:
 *     summary: Criar novo paciente
 *     description: Cria um novo paciente associado ao cuidador
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - dataNascimento
 *             properties:
 *               nome:
 *                 type: string
 *               dataNascimento:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Paciente criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 */
exports.routes.post("/pacientes", auth_1.auth, (req, res) => {
    return createPacienteController.handle(req, res);
});
exports.routes.get("/pacientes", auth_1.auth, (req, res) => {
    return listPacienteController.handle(req, res);
});
/**
 * @swagger
 * /pacientes/{id}:
 *   put:
 *     summary: Atualizar paciente
 *     description: Atualiza as informações de um paciente específico
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               dataNascimento:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Paciente atualizado com sucesso
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Paciente não encontrado
 */
exports.routes.put("/pacientes/:id", auth_1.auth, (req, res) => {
    return updatePacienteController.handle(req, res);
});
/**
 * @swagger
 * /pacientes/{id}:
 *   delete:
 *     summary: Deletar paciente
 *     description: Deleta um paciente específico
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do paciente
 *     responses:
 *       200:
 *         description: Paciente deletado com sucesso
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Paciente não encontrado
 */
exports.routes.delete("/pacientes/:id", auth_1.auth, (req, res) => {
    return deletePacienteController.handle(req, res);
});
/**
 * @swagger
 * /tarefas/{pacienteId}:
 *   get:
 *     summary: Listar tarefas de um paciente
 *     description: Lista todas as tarefas de um paciente específico
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pacienteId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do paciente
 *     responses:
 *       200:
 *         description: Lista de tarefas recuperada com sucesso
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Paciente não encontrado
 */
exports.routes.get("/tarefas/:pacienteId", auth_1.auth, (req, res) => {
    return listTarefaController.handle(req, res);
});
/**
 * @swagger
 * /tarefas:
 *   post:
 *     summary: Criar nova tarefa
 *     description: Cria uma nova tarefa para um paciente
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - descricao
 *               - pacienteId
 *             properties:
 *               descricao:
 *                 type: string
 *               dataVencimento:
 *                 type: string
 *                 format: date
 *               pacienteId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Tarefa criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 */
exports.routes.post("/tarefas", auth_1.auth, (req, res) => {
    return createTarefaController.handle(req, res);
});
/**
 * @swagger
 * /tarefas/{tarefaId}:
 *   put:
 *     summary: Atualizar tarefa
 *     description: Atualiza as informações de uma tarefa específica
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tarefaId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *               dataVencimento:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Tarefa não encontrada
 */
exports.routes.put("/tarefas/:tarefaId", auth_1.auth, (req, res) => {
    return updateTarefaController.handle(req, res);
});
/**
 * @swagger
 * /tarefas/{tarefaId}:
 *   delete:
 *     summary: Deletar tarefa
 *     description: Deleta uma tarefa específica
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tarefaId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa deletada com sucesso
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Tarefa não encontrada
 */
exports.routes.delete("/tarefas/:tarefaId", auth_1.auth, (req, res) => {
    return deleteTarefaController.handle(req, res);
});
/**
 * @swagger
 * /medicamentos:
 *   post:
 *     summary: Criar novo medicamento
 *     description: Cria um novo medicamento associado a uma tarefa
 *     tags: [Medicamentos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nomeRemedio
 *               - dosagem
 *               - frequencia
 *               - tarefaId
 *             properties:
 *               nomeRemedio:
 *                 type: string
 *               dosagem:
 *                 type: string
 *               frequencia:
 *                 type: string
 *               tarefaId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Medicamento criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 */
exports.routes.post("/medicamentos", auth_1.auth, (req, res) => {
    return createMedicamentoController.handle(req, res);
});
/**
 * @swagger
 * /medicamentos/{tarefaId}:
 *   get:
 *     summary: Listar medicamentos de uma tarefa
 *     description: Lista todos os medicamentos associados a uma tarefa
 *     tags: [Medicamentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tarefaId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Lista de medicamentos recuperada com sucesso
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Tarefa não encontrada
 */
exports.routes.get("/medicamentos/:tarefaId", auth_1.auth, (req, res) => {
    return listMedicamentoController.handle(req, res);
});
/**
 * @swagger
 * /medicamentos/{medicamentoId}:
 *   put:
 *     summary: Atualizar medicamento
 *     description: Atualiza as informações de um medicamento específico
 *     tags: [Medicamentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: medicamentoId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do medicamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nomeRemedio:
 *                 type: string
 *               dosagem:
 *                 type: string
 *               frequencia:
 *                 type: string
 *     responses:
 *       200:
 *         description: Medicamento atualizado com sucesso
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Medicamento não encontrado
 */
exports.routes.put("/medicamentos/:medicamentoId", auth_1.auth, (req, res) => {
    return updateMedicamentoController.handle(req, res);
});
/**
 * @swagger
 * /medicamentos/{medicamentoId}:
 *   delete:
 *     summary: Deletar medicamento
 *     description: Deleta um medicamento específico
 *     tags: [Medicamentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: medicamentoId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do medicamento
 *     responses:
 *       200:
 *         description: Medicamento deletado com sucesso
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Medicamento não encontrado
 */
exports.routes.delete("/medicamentos/:medicamentoId", auth_1.auth, (req, res) => {
    return deleteMedicamentoController.handle(req, res);
});
/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Obter dados do dashboard
 *     description: Retorna dados e estatísticas do dashboard do cuidador
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do dashboard recuperados com sucesso
 *       401:
 *         description: Não autenticado
 */
exports.routes.get("/dashboard", auth_1.auth, (req, res) => {
    return dashboardController.handle(req, res);
});
/**
 * @swagger
 * /tarefas-hoje:
 *   get:
 *     summary: Obter tarefas do dia
 *     description: Lista todas as tarefas programadas para hoje
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tarefas do dia recuperadas com sucesso
 *       401:
 *         description: Não autenticado
 */
exports.routes.get("/tarefas-hoje", auth_1.auth, (req, res) => {
    return tarefasDoDiaController.handle(req, res);
});
/**
 * @swagger
 * /notificacoes:
 *   get:
 *     summary: Obter notificações
 *     description: Lista todas as notificações do usuário autenticado
 *     tags: [Notificações]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notificações recuperadas com sucesso
 *       401:
 *         description: Não autenticado
 */
exports.routes.get("/notificacoes", auth_1.auth, (req, res) => {
    return notificacaoController.handle(req, res);
});
