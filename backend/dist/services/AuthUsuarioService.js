"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUsuarioService = void 0;
const client_1 = require("../prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthUsuarioService {
    async execute(email, senha) {
        const usuario = await client_1.prisma.usuario.findUnique({
            where: { email },
        });
        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }
        const senhaValida = await bcrypt_1.default.compare(senha, usuario.senha);
        if (!senhaValida) {
            throw new Error("Senha inválida");
        }
        const token = jsonwebtoken_1.default.sign({ id: usuario.id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        return {
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo,
            },
            token,
        };
    }
}
exports.AuthUsuarioService = AuthUsuarioService;
