import path from 'path';
import express from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Load Environment Variables
require('dotenv').config(path.resolve(__dirname, '../.env'));

// Create express app
import routes from './routes';
const app = express();

app.use(cookieParser());
app.use(cors());
app.use(routes);

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log('Listening on port ', PORT);
});
