import { prisma } from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthUsuarioService {
  async execute(email: string, senha: string) {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      throw new Error("Senha inválida");
    }

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    return {
      usuario,
      token,
    };
  }
}
