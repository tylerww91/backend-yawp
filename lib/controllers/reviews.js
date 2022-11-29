const { Router } = require('express');
const authenticate = require('../middleware/authenticate.js');
// const authorize = require('../middleware/authorize.js');
const userDelete = require('../middleware/userDelete.js');
const { Review } = require('../models/Review');

module.exports = Router().delete(
  '/:id',
  [authenticate, userDelete],
  async (req, res, next) => {
    try {
      await Review.delete(req.params.id);

      res.json({ message: 'delete successful' });
    } catch (e) {
      next(e);
    }
  }
);
