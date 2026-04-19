# ⚡ Me Cuida API - Cheatsheet Rápido

## 🚀 Início Rápido

```bash
# Inicie o servidor
cd backend
npx ts-node-dev src/server.ts

# Acesse o Swagger UI
# http://localhost:3333/api-docs
```

---

## 🔑 Autenticação em 3 Passos

```json
1️⃣ Criar Conta (POST /usuarios)
{
  "nome": "João",
  "email": "joao@example.com",
  "senha": "senha123"
}

2️⃣ Fazer Login (POST /login)
{
  "email": "joao@example.com",
  "senha": "senha123"
}
→ Receba: { "token": "eyJhbGci..." }

3️⃣ Clique em 🔓 Authorize no Swagger UI
→ Cole o token completo (com "Bearer " na frente)
```

---

## 👥 Pacientes - CRUD

### Listar

```bash
GET /pacientes
Authorization: Bearer {token}
```

### Criar

```bash
POST /pacientes
Authorization: Bearer {token}

{
  "nome": "Maria",
  "idade": 65,
  "genero": "Feminino",
  "observacoes": "Hipertensa"
}
```

### Atualizar

```bash
PUT /pacientes/{id}
Authorization: Bearer {token}

{
  "nome": "Maria Silva",
  "idade": 66,
  "genero": "Feminino"
}
```

### Deletar

```bash
DELETE /pacientes/{id}
Authorization: Bearer {token}
```

---

## ✅ Tarefas - CRUD

### Listar (de um paciente)

```bash
GET /tarefas/{pacienteId}
Authorization: Bearer {token}
```

### Criar

```bash
POST /tarefas
Authorization: Bearer {token}

{
  "titulo": "Tomar medicamento",
  "descricao": "500mg de antibiótico",
  "data": "2026-04-20T10:00:00Z",
  "pacienteId": "550e8400-...",
  "recorrente": false,
  "tipoTarefa": "Medicamento"
}
```

### Atualizar

```bash
PUT /tarefas/{tarefaId}
Authorization: Bearer {token}

{
  "titulo": "Tomar medicamento",
  "descricao": "Atualizado",
  "data": "2026-04-20T14:00:00Z"
}
```

### Marcar como Concluída

```bash
PUT /tarefas/{tarefaId}/concluir
Authorization: Bearer {token}

{
  "observacao": "Concluída com sucesso"
}
```

### Deletar

```bash
DELETE /tarefas/{tarefaId}
Authorization: Bearer {token}
```

---

## 💊 Medicamentos - CRUD

### Listar

```bash
GET /medicamentos/{tarefaId}
Authorization: Bearer {token}
```

### Criar

```bash
POST /medicamentos
Authorization: Bearer {token}

{
  "nomeRemedio": "Dipirona",
  "dosagem": "500mg",
  "frequencia": "A cada 8 horas",
  "tarefaId": "550e8400-..."
}
```

### Atualizar

```bash
PUT /medicamentos/{medicamentoId}
Authorization: Bearer {token}

{
  "nomeRemedio": "Dipirona",
  "dosagem": "750mg",
  "frequencia": "A cada 6 horas"
}
```

### Deletar

```bash
DELETE /medicamentos/{medicamentoId}
Authorization: Bearer {token}
```

---

## 📊 Dashboard & Dados

```bash
GET /dashboard
Authorization: Bearer {token}
# Retorna: { totalPacientes, tarefasHoje, ... }

GET /tarefas-hoje
Authorization: Bearer {token}
# Retorna: Array de tarefas para hoje

GET /notificacoes
Authorization: Bearer {token}
# Retorna: Array de notificações
```

---

## 📌 Headers Comuns

```
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Accept: application/json
```

---

## 📋 Estrutura de Resposta

### Sucesso (200)

```json
{
  "data": {
    /* recurso ou array */
  }
}
```

### Erro (400/401/404/500)

```json
{
  "message": "Descrição do erro",
  "error": "Detalhes técnicos"
}
```

---

## 🔄 Fluxo Típico: Criar Tarefa com Medicamento

```
1. POST /pacientes
   → Obtenha: paciente.id

2. POST /tarefas
   Envie: pacienteId
   → Obtenha: tarefa.id

3. POST /medicamentos
   Envie: tarefaId
   → Tarefa está completa com medicamento
```

---

## 🐛 Erros Comuns

| Erro             | Causa           | Solução                   |
| ---------------- | --------------- | ------------------------- |
| 401 Unauthorized | Sem token       | Faça login → Autorize     |
| 400 Bad Request  | Dados inválidos | Valide tipos e campos     |
| 404 Not Found    | ID inválido     | Verifique ID do recurso   |
| 500 Error        | Servidor        | Reinicie e verifique logs |

---

## 📱 cURL Rápido

### Criar Usuário

```bash
curl -X POST http://localhost:3333/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nome":"João","email":"joao@example.com","senha":"senha123"}'
```

### Login

```bash
curl -X POST http://localhost:3333/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@example.com","senha":"senha123"}'
```

### Listar Pacientes

```bash
curl -X GET http://localhost:3333/pacientes \
  -H "Authorization: Bearer {TOKEN}"
```

---

## 🎯 Dicas Rápidas

- 📝 **Sempre copie o token completo** (sem quebras de linha)
- ⏰ **Datas em ISO 8601**: `2026-04-20T10:00:00Z`
- 🆔 **UUIDs são únicos**: Use IDs da resposta anterior
- 🔐 **Autorize uma vez**: Vale para todos os endpoints
- 🧪 **Teste no Swagger UI**: Melhor que cURL
- 💾 **Copie respostas**: Guarde IDs para próximos testes

---

## 🔍 Verificar Status

```bash
GET http://localhost:3333/
# Resposta: "API MeCuida funcionando 🚀"

GET http://localhost:3333/test-db
Authorization: Bearer {TOKEN}
# Retorna todos os usuários (apenas para teste)
```

---

## 📚 Links Principais

- **Swagger UI**: http://localhost:3333/api-docs
- **Documentação Completa**: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **Guia Swagger UI**: [SWAGGER_UI_GUIDE.md](./SWAGGER_UI_GUIDE.md)
- **Índice**: [DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)

---

## 🎓 Exemplo Completo: Do Zero ao Deploy

```bash
# 1. Criar conta
POST /usuarios
{
  "nome": "Cuidador",
  "email": "cuidador@example.com",
  "senha": "senha123"
}

# 2. Login
POST /login
{
  "email": "cuidador@example.com",
  "senha": "senha123"
}

# 3. Autorizar no Swagger UI (copiar token)

# 4. Criar paciente
POST /pacientes
{
  "nome": "Paciente",
  "idade": 60,
  "genero": "Masculino"
}
# → Obter: paciente_id

# 5. Criar tarefa
POST /tarefas
{
  "titulo": "Consulta Médica",
  "data": "2026-04-25T14:00:00Z",
  "pacienteId": "paciente_id"
}
# → Obter: tarefa_id

# 6. Adicionar medicamento
POST /medicamentos
{
  "nomeRemedio": "Remédio",
  "dosagem": "500mg",
  "frequencia": "2x ao dia",
  "tarefaId": "tarefa_id"
}

# 7. Ver dashboard
GET /dashboard

# 8. Marcar tarefa como concluída
PUT /tarefas/tarefa_id/concluir
{
  "observacao": "Concluída"
}

✅ Fluxo completo!
```

---

## 🆘 Comandos Úteis (Terminal)

```bash
# Ver processo rodando na porta 3333
lsof -i :3333  # macOS/Linux
netstat -ano | findstr :3333  # Windows

# Matar processo
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows

# Recompile TypeScript
tsc --build

# Limpar cache
rm -rf node_modules dist
npm install
```

---

**Última atualização**: 19 de abril de 2026  
**Version**: 1.0.0
