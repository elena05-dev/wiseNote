import { Router } from 'express';
import { authenticate } from '../../../../middlewares/authenticate.js';
import { updateUserController } from '../../../../controllers/auth.js';
const router = Router();

router.get('/', authenticate, async (req, res) => {
  console.log('=== /users/me called ===');
  console.log('Cookies:', req.cookies);
  console.log('Headers:', req.headers.authorization);
  const user = req.user;
  res.json({ _id: user._id, name: user.name, email: user.email });
});

router.patch('/', authenticate, updateUserController);

export default router;
