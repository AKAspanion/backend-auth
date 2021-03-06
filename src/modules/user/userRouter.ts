import express from 'express';

import { getUsers } from './userController';

const router = express.Router();

router.get('/', getUsers);

export default router;
