const router = require('express').Router();
const ctrl = require('../controllers/listingController');
const auth = require('../middleware/auth');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post('/', auth, ctrl.create);
router.put('/:id', auth, ctrl.update);
router.delete('/:id', auth, ctrl.delete);

module.exports = router;