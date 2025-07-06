import express from 'express'
import { createUserHandler, getUsersHandler } from './controllers/userController.js';

const app = express();

app.use(express.json())

app.post('/users', createUserHandler);
app.get('/users', getUsersHandler);

app.listen(3000, () => console.log('Server is running...'));
