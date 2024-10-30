import express from 'express';
import userRoutes from './routes/userRoutes';
import contactRoutes from './routes/contactRoutes';
import { errorHandler } from './middleware/errorHandler';

const App = express();
const port = 3000;

App.use(express.json());
App.use(userRoutes);
App.use(contactRoutes);
App.use(errorHandler);

export const server = App.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});



