import express from 'express';
import cors from 'cors';
import connectDB from './db/connection.js';
import authroutes from './routes/auth.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('api/auth', authroutes);
app.listen(process.env.PORT, () => {
    connectDB();
    console.log('Server is running on http://localhost:3000');
}
)