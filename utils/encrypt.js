import crypto from 'crypto';
import { SECRET } from '../environment/env.js';

export const encrypt = (password) => {
  const encrypted = crypto
    .pbkdf2Sync(password, SECRET, 100, 64, 'sha512')
    .toString('hex');
  return encrypted;
};
