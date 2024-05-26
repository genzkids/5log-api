import { Router } from 'express';
import { PathNotFound, errHandler } from '@/v1/middlewares/errHandler';
import { challengeAuthentication } from '@/v1/middlewares/authHandler';
import { collectingLogs, pushLog, removeLogs } from '@/v1/worker/requestHandler';
import { validateRequest } from '../middlewares/requestValidators';

export const router = Router();

router.post('/logs', challengeAuthentication, validateRequest, pushLog);
/**
 * @description: using query params consist of : logID, level, source (eg: hostname, ip, or apps)
 */
router.get('/logs', challengeAuthentication, collectingLogs);
/**
 * @param: logid / document ID based on mongodb ID
 */
router.delete('/logs/:logsid?', challengeAuthentication, removeLogs);
/**
 * Error Handling Middleware
 */
router.use(PathNotFound);
router.use(errHandler);