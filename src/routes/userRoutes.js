const router = require('express').Router();

const userController = require('../controllers/userController');

router.route('/users').get(async (req, res) => {
	let response = await userController.getAllUsers();
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

router.route('/user/:id').get(async (req, res) => {
	let response = await userController.getUserById(req.params.id);
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

router.route('/addUser/').post(async (req, res) => {
	let response = await userController.addUser(req.body);
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

router.route('/updateUser/:id').put(async (req, res) => {
	let response = await userController.updateUser(req.params.id, req.body);
	if (response.success == true) {
		res.status(200).json(response);
	} else {

		res.status(404).json(response);
	}
});

router.route('/removeUser/:id').delete(async (req, res) => {
	let response = await userController.removeUser(req.params.id);
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

module.exports = router;