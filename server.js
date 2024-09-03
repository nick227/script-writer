import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/routes.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5200;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.use(express.static(path.join(path.resolve(), 'public')));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
