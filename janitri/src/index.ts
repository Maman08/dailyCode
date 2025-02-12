import client from 'prom-client';
import express from 'express';
import pool from './Config/db';
import router from './Routes';
import { setupSwagger } from './Utils/swagger';
const app = express();
const PORT = 8000;
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status'],
});

app.use((req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.url, status: res.statusCode });
  });
  next();
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

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
