import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Me Cuida",
      version: "1.0.0",
      description:
        "API para gerenciamento de pacientes, tarefas e notificações",
    },
    servers: [
      {
        url: "http://localhost:3333",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        Usuario: {
          type: "object",
          properties: {
            id: { type: "string" },
            nome: { type: "string" },
            email: { type: "string" },
          },
        },

        Paciente: {
          type: "object",
          properties: {
            id: { type: "string" },
            nome: { type: "string" },
            idade: { type: "number" },
          },
        },

        Tarefa: {
          type: "object",
          properties: {
            id: { type: "string" },
            titulo: { type: "string" },
            concluida: { type: "boolean" },
            data: { type: "string", format: "date-time" },
          },
        },
      },
    },
  },

  apis: ["./src/routes/**/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
