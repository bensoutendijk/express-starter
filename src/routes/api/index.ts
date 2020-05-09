import express from 'express';
import authRoutes from './auth';
import todoRoutes from './todos';
// import analyticsRoutes from './analytics'

const router = express.Router();

router.post('/hello', (req, res) => {
  const { body } = req;
  console.log(body);
  res.sendStatus(200);
})

router.use('/auth', authRoutes);
router.use('/todos', todoRoutes)

export default router;
