import dotenv from 'dotenv';
import path from 'path';
import process from 'process';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASEURL,
  default_password: process.env.DEFAULT_PASSWORD,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_secret_token: process.env.JWT_SECRET_TOKEN,
  node: process.env.NODE,
};
