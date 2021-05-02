const router = require('express').Router();
const departRoute = require('./deparmentRoutes');
const employRoute = require('./employeeRoutes');
const roleRoute = require('./roleRoutes');

router.use('/department', departRoute);
router.use('/employee', employRoute);
router.use('/role', roleRoute);

module.exports = router;