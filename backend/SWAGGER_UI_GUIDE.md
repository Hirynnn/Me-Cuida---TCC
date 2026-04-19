# 📚 Guia de Uso do Swagger UI - Me Cuida API

## O que é Swagger UI?

Swagger UI é uma interface visual interativa que permite explorar, entender e testar todos os endpoints da sua API sem precisar usar ferramentas externas como Postman ou cURL.

---

## 🚀 Acessando o Swagger UI

### 1. Inicie o servidor

```bash
cd backend
npm install
npx ts-node-dev src/server.ts
```

### 2. Abra no navegador

```
http://localhost:3333/api-docs
```

Você verá a interface do Swagger UI com todos os endpoints listados e organizados por categorias (tags).

---

## 📋 Navegação Básica

### Seções Principais

1. **Cabeçalho (Header)**
   - Título: "API Me Cuida"
   - Versão: 1.0.0
   - Descrição da API
   - Seletor de servidor (se houver múltiplos)

2. **Menu de Tags (Sidebar)**
   - 🔐 Auth (Autenticação)
   - 👥 Pacientes
   - ✅ Tarefas
   - 💊 Medicamentos
   - 📊 Dashboard
   - 🔔 Notificações

3. **Lista de Endpoints**
   - Agrupados por tag
   - Código de cor por método HTTP
   - Descrição resumida

---

## 🔍 Explorando um Endpoint

### Passo 1: Clique no endpoint

Clique em qualquer endpoint para expandi-lo e ver todos os detalhes:

```
POST /usuarios
├─ Descrição
├─ Parâmetros
├─ Request Body
└─ Responses
```

### Passo 2: Entenda os componentes

#### 📌 Método HTTP

- 🟢 **GET** - Buscar dados
- 🔵 **POST** - Criar dados
- 🟠 **PUT** - Atualizar dados
- 🔴 **DELETE** - Deletar dados

#### 📝 Descrição

Explains what the endpoint does (em português)

#### 🔑 Segurança (🔒 ícone)

Indica se autenticação é requerida:

- ✅ **Com cadeado**: Requer token JWT
- ❌ **Sem cadeado**: Acesso público

#### 📤 Request Body

Clique em "Schema" para ver a estrutura esperada:

```json
{
  "nome": "string",
  "email": "string",
  "senha": "string"
}
```

#### 📥 Responses

As possíveis respostas do servidor:

- **200** - Sucesso ✅
- **400** - Bad Request ❌
- **401** - Não autenticado 🔐
- **404** - Não encontrado 🚫
- **500** - Erro do servidor ⚠️

---

## 🧪 Testando Endpoints no Swagger UI

### Método 1: Sem Autenticação (endpoints públicos)

**Exemplo: Criar usuário**

1. Abra o endpoint `POST /usuarios`
2. Clique no botão **"Try it out"**
3. Na seção "Request body", você verá um campo JSON editável
4. Preencha os dados:

```json
{
  "nome": "João Silva",
  "email": "joao@example.com",
  "senha": "senha123"
}
```

5. Clique em **"Execute"**
6. Veja a resposta em "Responses"

---

### Método 2: Com Autenticação (endpoints protegidos)

#### Passo 1: Obtenha um Token

1. Vá para **POST /login**
2. Clique em **"Try it out"**
3. Preencha com credenciais válidas:

```json
{
  "email": "joao@example.com",
  "senha": "senha123"
}
```

4. Clique em **"Execute"**
5. Copie o `token` da resposta

#### Passo 2: Configure a Autenticação

1. Clique no botão **🔓 Authorize** (no topo da página)
2. Clique em **"Bearer Auth"**
3. Cole o token no campo:

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. Clique em **"Authorize"**
5. Clique em **"Close"**

#### Passo 3: Teste Endpoints Protegidos

Agora você pode testar qualquer endpoint que requer autenticação:

1. Vá para **GET /pacientes**
2. Clique em **"Try it out"**
3. Clique em **"Execute"**
4. O token será automaticamente incluído no header `Authorization`

---

## 📚 Exemplos de Fluxo Completo

### Cenário: Criar um paciente e uma tarefa

#### Etapa 1: Fazer Login

```json
POST /login
{
  "email": "cuidador@example.com",
  "senha": "senha123"
}

Resposta:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "usuario": { ... }
}
```

#### Etapa 2: Autorizar no Swagger

- Clique em 🔓 Authorize
- Cole o token JWT
- Clique em Authorize

#### Etapa 3: Criar Paciente

```json
POST /pacientes
{
  "nome": "Maria Santos",
  "idade": 65,
  "genero": "Feminino",
  "observacoes": "Hipertensão controlada"
}

Resposta:
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "nome": "Maria Santos",
    "idade": 65,
    "genero": "Feminino",
    ...
  }
}
```

#### Etapa 4: Criar Tarefa para o Paciente

```json
POST /tarefas
{
  "titulo": "Tomar medicamento",
  "descricao": "Tomar antibiótico 500mg",
  "data": "2026-04-19T10:00:00Z",
  "pacienteId": "550e8400-e29b-41d4-a716-446655440000",
  "recorrente": false,
  "tipoTarefa": "Medicamento"
}

Resposta:
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "titulo": "Tomar medicamento",
    ...
  }
}
```

#### Etapa 5: Criar Medicamento

```json
POST /medicamentos
{
  "nomeRemedio": "Dipirona",
  "dosagem": "500mg",
  "frequencia": "A cada 8 horas",
  "tarefaId": "550e8400-e29b-41d4-a716-446655440002"
}

Resposta:
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440003",
    "nomeRemedio": "Dipirona",
    ...
  }
}
```

---

## 💡 Dicas e Truques

### 1. Copie a URL da Requisição

Cada teste gera uma URL cURL que você pode copiar:

```bash
curl -X POST "http://localhost:3333/usuarios" \
  -H "accept: application/json" \
  -H "Content-Type: application/json" \
  -d "{\"nome\":\"João\",\"email\":\"joao@example.com\",\"senha\":\"senha123\"}"
```

### 2. Visualize o Schema

Clique em "Schema" para ver a estrutura esperada em formato JSON Schema

### 3. Expanda/Collapse Respostas

Clique nas setas para expandir/colapsar as respostas aninhadas

### 4. Pesquise Endpoints

Use o campo de busca (🔍) no topo para encontrar endpoints rapidamente

### 5. Visualize Erros

Veja a resposta de erro completa para entender problemas:

```json
{
  "message": "Email já cadastrado",
  "error": "Email already exists"
}
```

---

## 🔐 Trabalhando com Autenticação

### Fluxo de Autenticação

```
1. Usuario não autenticado
   ↓
2. POST /usuarios → Criar conta
   ↓
3. POST /login → Obter token JWT
   ↓
4. Clique em "Authorize"
   ↓
5. Cole o token (sem "Bearer ")
   ↓
6. Acesse endpoints protegidos (com 🔒)
```

### Tokens JWT

- **Formato**: `eyJhbGciOiJIUzI1NiIs...` (3 partes separadas por `.`)
- **Validade**: Configurável no backend
- **Renovação**: Faça login novamente se expirar

### Resetar Autenticação

Clique em 🔓 Authorize → "Logout" para limpar o token

---

## 📊 Documentação de Modelos (Schemas)

No final da página, você encontrará a documentação de todos os modelos:

### Usuario

```json
{
  "id": "uuid",
  "nome": "string",
  "email": "string",
  "tipo": "CUIDADOR | PACIENTE",
  "telefone": "string or null",
  "criadoEm": "2026-04-19T10:00:00Z"
}
```

### Paciente

```json
{
  "id": "uuid",
  "nome": "string",
  "idade": "integer",
  "genero": "string",
  "observacoes": "string or null",
  "cuidadorId": "uuid"
}
```

### Tarefa

```json
{
  "id": "uuid",
  "titulo": "string",
  "descricao": "string or null",
  "recorrente": "boolean",
  "tipoTarefa": "string",
  "concluida": "boolean",
  "data": "2026-04-19T10:00:00Z",
  "pacienteId": "uuid"
}
```

### Medicamento

```json
{
  "id": "uuid",
  "nomeRemedio": "string",
  "dosagem": "string",
  "frequencia": "string",
  "tarefaId": "uuid"
}
```

---

## 🆘 Solução de Problemas

### "No Authorization"

**Problema**: Não consigo acessar endpoints protegidos  
**Solução**:

1. Faça login em POST /login
2. Clique em Authorize
3. Cole o token corretamente
4. Recarregue a página

### "401 Unauthorized"

**Problema**: Recebo erro 401  
**Solução**:

- Token expirou → Faça login novamente
- Token inválido → Verifique se foi copiado corretamente
- Token removido → Clique em Authorize de novo

### "400 Bad Request"

**Problema**: Dados inválidos  
**Solução**:

- Verifique o schema esperado
- Valide os tipos de dados
- Confira os campos obrigatórios (marcados com \*)
- Veja a mensagem de erro completa na resposta

### "404 Not Found"

**Problema**: Recurso não encontrado  
**Solução**:

- ID do recurso está correto?
- Recurso foi deletado?
- Você tem permissão?

### "500 Internal Server Error"

**Problema**: Erro do servidor  
**Solução**:

- Verifique o console do servidor (terminal)
- Reinicie o servidor
- Verifique a conexão com o banco de dados

---

## 🎯 Casos de Uso Comuns

### 1. Criar Conta e Fazer Login

```
1. POST /usuarios (sem autenticação)
2. POST /login (sem autenticação)
3. Copiar token
4. Clique em Authorize
5. Cole o token
```

### 2. Gerenciar Pacientes

```
1. GET /pacientes (listar)
2. POST /pacientes (criar)
3. PUT /pacientes/{id} (atualizar)
4. DELETE /pacientes/{id} (deletar)
```

### 3. Gerenciar Tarefas

```
1. GET /tarefas/{pacienteId} (listar)
2. POST /tarefas (criar)
3. PUT /tarefas/{tarefaId} (atualizar)
4. PUT /tarefas/{tarefaId}/concluir (marcar concluída)
5. DELETE /tarefas/{tarefaId} (deletar)
```

### 4. Adicionar Medicamentos

```
1. POST /medicamentos (criar)
2. GET /medicamentos/{tarefaId} (listar)
3. PUT /medicamentos/{medicamentoId} (atualizar)
4. DELETE /medicamentos/{medicamentoId} (deletar)
```

### 5. Ver Dashboard

```
1. GET /dashboard (estatísticas)
2. GET /tarefas-hoje (tarefas do dia)
3. GET /notificacoes (notificações)
```

---

## 📱 Dicas para Mobile

1. O Swagger UI é responsivo e funciona bem em celulares
2. Use a versão desktop para testes mais complexos
3. Copie os cURLs e use em apps como Insomnia para testar

---

## 🔄 Workflow Recomendado

### Para Desenvolvimento

```
1. Comece testando endpoints públicos (POST /usuarios, POST /login)
2. Obtenha e armazene o token
3. Use Authorize para endpoints protegidos
4. Teste CRUD completo para cada recurso
5. Valide respostas de erro
6. Verifique os dados no banco de dados
```

### Para Documentação

```
1. Cada endpoint tem descrição clara
2. Clique em "Schema" para ver estrutura
3. Copie exemplos de request/response
4. Use para documentar frontend/mobile
```

---

## 📞 Referência Rápida

| Operação              | Método | Endpoint                      |
| --------------------- | ------ | ----------------------------- |
| Criar conta           | POST   | /usuarios                     |
| Fazer login           | POST   | /login                        |
| Meu perfil            | GET    | /perfil                       |
| Listar pacientes      | GET    | /pacientes                    |
| Criar paciente        | POST   | /pacientes                    |
| Atualizar paciente    | PUT    | /pacientes/{id}               |
| Deletar paciente      | DELETE | /pacientes/{id}               |
| Listar tarefas        | GET    | /tarefas/{pacienteId}         |
| Criar tarefa          | POST   | /tarefas                      |
| Atualizar tarefa      | PUT    | /tarefas/{tarefaId}           |
| Concluir tarefa       | PUT    | /tarefas/{tarefaId}/concluir  |
| Deletar tarefa        | DELETE | /tarefas/{tarefaId}           |
| Criar medicamento     | POST   | /medicamentos                 |
| Listar medicamentos   | GET    | /medicamentos/{tarefaId}      |
| Atualizar medicamento | PUT    | /medicamentos/{medicamentoId} |
| Deletar medicamento   | DELETE | /medicamentos/{medicamentoId} |
| Dashboard             | GET    | /dashboard                    |
| Tarefas hoje          | GET    | /tarefas-hoje                 |
| Notificações          | GET    | /notificacoes                 |

---

## 🎓 Recursos Adicionais

- [Documentação oficial Swagger](https://swagger.io/tools/swagger-ui/)
- [OpenAPI 3.0 Specification](https://spec.openapis.org/oas/v3.0.3)
- [JWT.io](https://jwt.io/) - Para decodificar tokens

---

**Última atualização**: 19 de abril de 2026  
**Versão da API**: 1.0.0
