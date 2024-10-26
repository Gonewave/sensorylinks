import { Router } from 'express';
import { sendBulkEmail } from '../controllers/emailController.js';

const router = Router();

router.post('/send', sendBulkEmail);

export default router;