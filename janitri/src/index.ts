import express from 'express';
import pool from './Config/db';
import router from './Routes';
import { setupSwagger } from './Utils/swagger';
const app = express();
const PORT = 8000;
setupSwagger(app);
console.log("Swagger Docs available at /api-docs");
// pool.connect();
app.use(express.json());
app.use('/',router);let server: any;

if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => {
    console.log('Server is running on PORT', PORT);
  });
} else {
  console.log("Test mode: Server not started");
}

export { app, server };
