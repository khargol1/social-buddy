const router = require('express').Router();

const{ getAllUsers, createUser, getUserById, updateUser, deleteUser } = require('../../controllers/user-controller');

//get routes at api/users
router.route('/')
.get(getAllUsers)
.post(createUser);

router.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

module.exports = router;