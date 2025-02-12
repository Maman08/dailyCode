import express from 'express';
import pool from './Config/db';
import router from './Routes';
const app = express();
const PORT = 8000;
// pool.connect();
app.use(express.json());
app.use('/',router);
app.listen(PORT, () => {
  console.log('Srver is running on PORT ', PORT);
});


