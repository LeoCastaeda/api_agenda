import express from 'express';
import userRoutes from './routes/userRoutes';
import contactRoutes from './routes/contactRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const port = 3000;

app.use(express.json());
app.use(userRoutes);
app.use(contactRoutes);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
