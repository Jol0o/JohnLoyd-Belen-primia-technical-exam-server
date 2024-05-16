const express = require('express');
const app = express();
const cors = require('cors');
const positionsRouter = require('./routes/position');
const candidatesRouter = require('./routes/candidates');
const authRouter = require('./routes/auth');
const authMiddleware = require('./middleware/auth');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/positions', authMiddleware, positionsRouter);
app.use('/api/candidates', authMiddleware, candidatesRouter);

const PORT = 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
