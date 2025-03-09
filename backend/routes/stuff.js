const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const stuffCntrl = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.use(express.json());

router.post('/',multer,stuffCntrl.createThing);
router.get('/:id', stuffCntrl.getOneThing);
router.put('/:id',multer,stuffCntrl.modifyThing);
router.delete('/:id', stuffCntrl.deleteThing);
router.get('/',stuffCntrl.getAllThings);

module.exports = router;