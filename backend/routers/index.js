const router = require('express').Router();
const statusRouter = require('./status')
const NotFoundError = require('../errors/not-found-err');
const { SOURCE_NOT_FOUND } = require('../utils/constants');

router.use('/', statusRouter);
router.use('*', () => {
  throw new NotFoundError(SOURCE_NOT_FOUND);
});

module.exports = router;
