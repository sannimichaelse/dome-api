import * as dotenv from 'dotenv';

dotenv.config();

const production = {
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
  API_VERSION: process.env.API_VERSION,
  DATABASE_URL: process.env.DATABASE,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  NOTIFICATION_MAIL: process.env.NOTIFICATION_MAIL,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SENDGRID_FROM: process.env.SENDGRID_FROM
};

export default production;
