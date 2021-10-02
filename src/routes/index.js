import express from 'express';
const router = express.Router();

import userRoute from './user.route';
/**
 * Function contains Application routes
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json({
      message: 'Welcome to DOME API. Powered by Soft Signatures Lab'
    });
  });
  router.use('/auth', userRoute);

  return router;
};

export default routes;
