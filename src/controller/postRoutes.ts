import { Router } from 'express';
import { PostController } from '../controllers/PostController';
import { AuthMiddleware } from '../middleware/AuthMiddleware';

const router = Router();

router.post('/', AuthMiddleware, PostController.create);
router.get('/', PostController.read);
router.put('/:id', AuthMiddleware, PostController.update);
router.delete('/:id', AuthMiddleware, PostController.delete);

export default router;
