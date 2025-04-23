import  express  from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import shopRoutes from './routes/shop.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/generations', shopRoutes);

app.get('/', (req, res) => {
  res.status(200).json({messege:'Hello from Shop B!'});
});

app.listen(2050, () => console.log('Server is running on port 2050'));