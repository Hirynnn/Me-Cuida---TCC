# Documentação da API Me Cuida

## Visão Geral

A API Me Cuida é um sistema de gerenciamento de pacientes e tarefas com sistema de notificações. Todas as rotas (exceto autenticação) requerem um token JWT no header `Authorization: Bearer {token}`.

**URL Base**: `http://localhost:3333`

---

## 📋 Endpoints

### 🔐 Autenticação

#### 1. Criar Usuário

- **Método**: `POST`
- **Rota**: `/usuarios`
- **Autenticação**: ❌ Não requerida
- **Descrição**: Cria um novo usuário no sistema

**Request Body**:

```json
{
  "nome": "João Silva",
  "email": "joao@example.com",
  "senha": "senha123"
}
```

**Response (200)**:

```json
{
  "data": {
    "id": "uuid",
    "nome": "João Silva",
    "email": "joao@example.com",
    "tipo": "CUIDADOR",
    "telefone": null,
    "criadoEm": "2026-04-19T10:00:00Z"
  }
}
```

---

#### 2. Login

- **Método**: `POST`
- **Rota**: `/login`
- **Autenticação**: ❌ Não requerida
- **Descrição**: Autentica um usuário e retorna um token JWT

**Request Body**:

```json
{
  "email": "joao@example.com",
  "senha": "senha123"
}
```

**Response (200)**:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "usuario": {
    "id": "uuid",
    "nome": "João Silva",
    "email": "joao@example.com",
    "tipo": "CUIDADOR",
    "criadoEm": "2026-04-19T10:00:00Z"
  }
}
```

---

#### 3. Obter Perfil

- **Método**: `GET`
- **Rota**: `/perfil`
- **Autenticação**: ✅ Requerida (Bearer Token)
- **Descrição**: Retorna as informações do usuário autenticado

**Response (200)**:

```json
{
  "message": "Você está logado",
  "userId": "uuid"
}
```

---

### 👥 Pacientes

#### 4. Criar Paciente

- **Método**: `POST`
- **Rota**: `/pacientes`
- **Autenticação**: ✅ Requerida
- **Descrição**: Cria um novo paciente associado ao cuidador autenticado

**Request Body**:

```json
{
  "nome": "Maria Santos",
  "idade": 65,
  "genero": "Feminino",
  "observacoes": "Observações adicionais"
}
```

**Response (200)**:

```json
{
  "data": {
    "id": "uuid",
    "nome": "Maria Santos",
    "idade": 65,
    "genero": "Feminino",
    "observacoes": "Observações adicionais",
    "cuidadorId": "uuid"
  }
}
```

---

#### 5. Listar Pacientes

- **Método**: `GET`
- **Rota**: `/pacientes`
- **Autenticação**: ✅ Requerida
- **Descrição**: Lista todos os pacientes do cuidador autenticado

**Response (200)**:

```json
{
  "data": [
    {
      "id": "uuid",
      "nome": "Maria Santos",
      "idade": 65,
      "genero": "Feminino",
      "observacoes": null,
      "cuidadorId": "uuid"
    }
  ]
}
```

---

#### 6. Atualizar Paciente

- **Método**: `PUT`
- **Rota**: `/pacientes/{id}`
- **Autenticação**: ✅ Requerida
- **Descrição**: Atualiza as informações de um paciente específico
- **Parâmetros**:
  - `id` (path, uuid): ID do paciente

**Request Body**:

```json
{
  "nome": "Maria Santos",
  "idade": 66,
  "genero": "Feminino",
  "observacoes": "Atualizações"
}
```

**Response (200)**:

```json
{
  "data": {
    "id": "uuid",
    "nome": "Maria Santos",
    "idade": 66,
    "genero": "Feminino",
    "observacoes": "Atualizações",
    "cuidadorId": "uuid"
  }
}
```

---

#### 7. Deletar Paciente

- **Método**: `DELETE`
- **Rota**: `/pacientes/{id}`
- **Autenticação**: ✅ Requerida
- **Descrição**: Deleta um paciente específico
- **Parâmetros**:
  - `id` (path, uuid): ID do paciente

**Response (200)**:

```json
{
  "message": "Paciente deletado com sucesso"
}
```

---

### ✅ Tarefas

#### 8. Listar Tarefas de um Paciente

- **Método**: `GET`
- **Rota**: `/tarefas/{pacienteId}`
- **Autenticação**: ✅ Requerida
- **Descrição**: Lista todas as tarefas de um paciente específico
- **Parâmetros**:
  - `pacienteId` (path, uuid): ID do paciente

**Response (200)**:

```json
{
  "data": [
    {
      "id": "uuid",
      "titulo": "Tomar medicamento",
      "descricao": "Tomar antibiótico",
      "recorrente": false,
      "tipoTarefa": "Medicamento",
      "concluida": false,
      "data": "2026-04-19T10:00:00Z",
      "pacienteId": "uuid"
    }
  ]
}
```

---

#### 9. Criar Tarefa

- **Método**: `POST`
- **Rota**: `/tarefas`
- **Autenticação**: ✅ Requerida
- **Descrição**: Cria uma nova tarefa para um paciente

**Request Body**:

```json
{
  "titulo": "Tomar medicamento",
  "descricao": "Tomar antibiótico",
  "data": "2026-04-19T10:00:00Z",
  "pacienteId": "uuid",
  "recorrente": false,
  "tipoTarefa": "Medicamento"
}
```

**Response (200)**:

```json
{
  "data": {
    "id": "uuid",
    "titulo": "Tomar medicamento",
    "descricao": "Tomar antibiótico",
    "recorrente": false,
    "tipoTarefa": "Medicamento",
    "concluida": false,
    "data": "2026-04-19T10:00:00Z",
    "pacienteId": "uuid"
  }
}
```

---

#### 10. Atualizar Tarefa

- **Método**: `PUT`
- **Rota**: `/tarefas/{tarefaId}`
- **Autenticação**: ✅ Requerida
- **Descrição**: Atualiza as informações de uma tarefa específica
- **Parâmetros**:
  - `tarefaId` (path, uuid): ID da tarefa

**Request Body**:

```json
{
  "titulo": "Tomar medicamento",
  "descricao": "Tomar antibiótico atualizado",
  "data": "2026-04-19T10:00:00Z",
  "recorrente": true,
  "tipoTarefa": "Medicamento"
}
```

**Response (200)**:

```json
{
  "data": {
    "id": "uuid",
    "titulo": "Tomar medicamento",
    "descricao": "Tomar antibiótico atualizado",
    "recorrente": true,
    "tipoTarefa": "Medicamento",
    "concluida": false,
    "data": "2026-04-19T10:00:00Z",
    "pacienteId": "uuid"
  }
}
```

---

#### 11. Marcar Tarefa como Concluída

- **Método**: `PUT`
- **Rota**: `/tarefas/{tarefaId}/concluir`
- **Autenticação**: ✅ Requerida
- **Descrição**: Marca uma tarefa como concluída e registra no histórico
- **Parâmetros**:
  - `tarefaId` (path, uuid): ID da tarefa

**Request Body** (opcional):

```json
{
  "observacao": "Tarefa concluída com sucesso"
}
```

**Response (200)**:

```json
{
  "data": {
    "id": "uuid",
    "titulo": "Tomar medicamento",
    "descricao": "Tomar antibiótico",
    "recorrente": false,
    "tipoTarefa": "Medicamento",
    "concluida": true,
    "data": "2026-04-19T10:00:00Z",
    "pacienteId": "uuid"
  }
}
```

---

#### 12. Deletar Tarefa

- **Método**: `DELETE`
- **Rota**: `/tarefas/{tarefaId}`
- **Autenticação**: ✅ Requerida
- **Descrição**: Deleta uma tarefa específica
- **Parâmetros**:
  - `tarefaId` (path, uuid): ID da tarefa

**Response (200)**:

```json
{
  "message": "Tarefa deletada com sucesso"
}
```

---

### 💊 Medicamentos

#### 13. Criar Medicamento

- **Método**: `POST`
- **Rota**: `/medicamentos`
- **Autenticação**: ✅ Requerida
- **Descrição**: Cria um novo medicamento associado a uma tarefa

**Request Body**:

```json
{
  "nomeRemedio": "Dipirona",
  "dosagem": "500mg",
  "frequencia": "A cada 8 horas",
  "tarefaId": "uuid"
}
```

**Response (200)**:

```json
{
  "data": {
    "id": "uuid",
    "nomeRemedio": "Dipirona",
    "dosagem": "500mg",
    "frequencia": "A cada 8 horas",
    "tarefaId": "uuid"
  }
}
```

---

#### 14. Listar Medicamentos de uma Tarefa

- **Método**: `GET`
- **Rota**: `/medicamentos/{tarefaId}`
- **Autenticação**: ✅ Requerida
- **Descrição**: Lista todos os medicamentos associados a uma tarefa
- **Parâmetros**:
  - `tarefaId` (path, uuid): ID da tarefa

**Response (200)**:

```json
{
  "data": [
    {
      "id": "uuid",
      "nomeRemedio": "Dipirona",
      "dosagem": "500mg",
      "frequencia": "A cada 8 horas",
      "tarefaId": "uuid"
    }
  ]
}
```

---

#### 15. Atualizar Medicamento

- **Método**: `PUT`
- **Rota**: `/medicamentos/{medicamentoId}`
- **Autenticação**: ✅ Requerida
- **Descrição**: Atualiza as informações de um medicamento específico
- **Parâmetros**:
  - `medicamentoId` (path, uuid): ID do medicamento

**Request Body**:

```json
{
  "nomeRemedio": "Dipirona",
  "dosagem": "750mg",
  "frequencia": "A cada 6 horas"
}
```

**Response (200)**:

```json
{
  "data": {
    "id": "uuid",
    "nomeRemedio": "Dipirona",
    "dosagem": "750mg",
    "frequencia": "A cada 6 horas",
    "tarefaId": "uuid"
  }
}
```

---

#### 16. Deletar Medicamento

- **Método**: `DELETE`
- **Rota**: `/medicamentos/{medicamentoId}`
- **Autenticação**: ✅ Requerida
- **Descrição**: Deleta um medicamento específico
- **Parâmetros**:
  - `medicamentoId` (path, uuid): ID do medicamento

**Response (200)**:

```json
{
  "message": "Medicamento deletado com sucesso"
}
```

---

### 📊 Dashboard e Dados

#### 17. Obter Dashboard

- **Método**: `GET`
- **Rota**: `/dashboard`
- **Autenticação**: ✅ Requerida
- **Descrição**: Retorna dados e estatísticas do dashboard do cuidador

**Response (200)**:

```json
{
  "data": {
    "totalPacientes": 5,
    "tarefasHoje": 12,
    "tarefasConcluidas": 8,
    "tarefasPendentes": 4,
    "ultimasTarefas": []
  }
}
```

---

#### 18. Obter Tarefas do Dia

- **Método**: `GET`
- **Rota**: `/tarefas-hoje`
- **Autenticação**: ✅ Requerida
- **Descrição**: Lista todas as tarefas programadas para hoje

**Response (200)**:

```json
{
  "data": [
    {
      "id": "uuid",
      "titulo": "Tomar medicamento",
      "descricao": "Tomar antibiótico",
      "recorrente": false,
      "tipoTarefa": "Medicamento",
      "concluida": false,
      "data": "2026-04-19T10:00:00Z",
      "pacienteId": "uuid"
    }
  ]
}
```

---

#### 19. Obter Notificações

- **Método**: `GET`
- **Rota**: `/notificacoes`
- **Autenticação**: ✅ Requerida
- **Descrição**: Lista todas as notificações do usuário autenticado

**Response (200)**:

```json
{
  "data": [
    {
      "id": "uuid",
      "tarefaId": "uuid",
      "usuarioId": "uuid",
      "enviadaEm": "2026-04-19T10:00:00Z"
    }
  ]
}
```

---

## 🔑 Autenticação

A maioria dos endpoints requer autenticação via Token JWT (Bearer Token).

### Como usar:

1. Faça login em `/login` com suas credenciais
2. Receba um `token` na resposta
3. Adicione o token no header de todas as requisições subsequentes:

```
Authorization: Bearer {seu_token}
```

---

## ⚠️ Tratamento de Erros

### Erro 401 - Não Autenticado

```json
{
  "message": "Token não fornecido ou inválido"
}
```

### Erro 400 - Dados Inválidos

```json
{
  "message": "Dados fornecidos são inválidos",
  "error": "Detalhes do erro"
}
```

### Erro 404 - Recurso Não Encontrado

```json
{
  "message": "Recurso não encontrado"
}
```

### Erro 500 - Erro Interno do Servidor

```json
{
  "message": "Erro interno do servidor"
}
```

---

## 📝 Notas Importantes

- Todos os IDs são UUIDs (formato: `550e8400-e29b-41d4-a716-446655440000`)
- Datas e horas devem ser fornecidas em formato ISO 8601 (ex: `2026-04-19T10:00:00Z`)
- Campos marcados como `nullable: true` podem ser `null` na resposta
- O tipo de usuário é enum: `CUIDADOR` ou `PACIENTE`
- Tarefas recorrentes podem ser configuradas para se repetir automaticamente
- O histórico de tarefas é automaticamente registrado quando uma tarefa é marcada como concluída

---

## 🚀 Acesso ao Swagger UI

Você pode visualizar e testar todos os endpoints no Swagger UI em:

```
http://localhost:3333/api-docs
```

Todos os schemas, exemplos de request/response e informações de autenticação estão disponíveis lá.

---

**Última atualização**: 19 de abril de 2026
