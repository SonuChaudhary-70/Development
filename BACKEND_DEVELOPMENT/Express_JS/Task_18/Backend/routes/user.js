const express = require('express');
const userController = require('../Controller/user.js');

const router = express.Router();

router.get('/',userController.getUsers);
router.get('/:id',userController.getUserById)
router.post('/add-user',userController.addUser);
router.put('/update-user/:id',userController.updateUser);
router.delete('/deleteUser/:id',userController.deleteUser);

module.exports = router;