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
app.use('/',router);
app.listen(PORT, () => {
  console.log('Srver is running on PORT ', PORT);
});


