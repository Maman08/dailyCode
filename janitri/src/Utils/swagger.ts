import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Janitri Backend API",
      version: "1.0.0",
      description: "API Documentation for Janitri Backend",
    },
    servers: [
      {
        url: "http://localhost:8000", 
        description: "Local server",
      },
    ],
  },
  apis: ["./src/Routes/*.ts"], 
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}
