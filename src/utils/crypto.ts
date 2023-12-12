import { createHash } from 'crypto';

// Thuat toan hashpass
function sha256(content: string) {
  return createHash('sha256').update(content).digest('hex');
}

function hashPassword(password: string) {
  return sha256(password + process.env.PASSWORD_SECRET);
}

export default hashPassword;
