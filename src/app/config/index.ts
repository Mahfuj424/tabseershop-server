import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV:process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_screet:process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in:process.env.EXPIREIN,
  store_id:process.env.STORE_ID,
  signeture_key:process.env.SINGNETURE_KEY,
  payment_url: process.env.PAYMENT_URL,
  payment_verify_url:process.env.PAYMENT_VERIFY_URL
};