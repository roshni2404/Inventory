import express from 'express';
import cors from 'cors';
import connectDB from './db/connection.js';
import authRoutes from './routes/auth.js'; // ✅ Use import

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes); // ✅ Use the imported object

connectDB();
app.listen(process.env.PORT, () => {
    console.log('Server is running on http://localhost:3000');
});
