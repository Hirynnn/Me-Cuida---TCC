import { prisma } from "../prisma/client";
import bcrypt from "bcrypt";

export class CreateUsuarioService {
  async execute(nome: string, email: string, senha: string) {
    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuario.create({
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
