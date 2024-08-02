import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import headerRoutes from './routes/headerRoutes.js';
dotenv.config(); // Load environment variables;


const app = express();
app.use(morgan('dev'));  // Add this line to use morgan middleware
app.use(express.json());
app.use('/header', headerRoutes);

export default app;
