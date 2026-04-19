import express from "express";
import cors from "cors";
import { routes } from "./routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

// rotas primeiro
app.use(routes);

// swagger (pode ficar aqui também)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 👇 SEMPRE O ÚLTIMO
app.use(errorHandler);
const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log("Tá rodando caralho");
});
