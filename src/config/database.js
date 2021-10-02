import mongoose from 'mongoose';
import logger from './logger';
import User from '../models/user.model';
import config from './index'
class Connection {
  constructor() {}

  async setup() {
    try {
      await mongoose.connect(config.DATABASE_URL, {
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      logger.info('Connected to the database.');
    } catch (err) {
      logger.error('Could not connect to the database.', err);
    }
  }

  async tearDown() {
    if (process.env.NODE_ENV === 'test') {
      User.collection.deleteOne();
      await User.collection.drop();
      logger.info('Tear down completed');
    } else {
      logger.info('Tear down is only allowed in test environment');
    }
  }
}

export default Connection;
