import express from 'express';
import authRoutes from './auth';
// import chatRoutes from './chat';
// import analyticsRoutes from './analytics'

const router = express.Router();

router.post('/hello', (req, res) => {
  const { body } = req;
  console.log(body);
  res.sendStatus(200);
})

router.use('/auth', authRoutes);

export default router;
