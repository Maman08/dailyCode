import express from 'express';
import pool from './Config/db';
const app = express();
const PORT = 8000;
pool.connect();
app.use(express.json());
app.get('/', (req, res) => {
  res.send('hello');
});
app.listen(PORT, () => {
  console.log('Srver is running on PORT ', PORT);
});


