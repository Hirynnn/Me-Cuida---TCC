"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsuarioService = void 0;
const client_1 = require("../prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
class CreateUsuarioService {
    async execute(nome, email, senha) {
        const senhaHash = await bcrypt_1.default.hash(senha, 10);
        const usuario = await client_1.prisma.usuario.create({
            data: {
                nome,
                email,
                senha: senhaHash,
                tipo: "CUIDADOR",
            },
        });
        return usuario;
    }
}
exports.CreateUsuarioService = CreateUsuarioService;
