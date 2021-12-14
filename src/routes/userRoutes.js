const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../models/userModel');
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
	if (response != undefined && response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

router.route('/user/:idUser/add-project').post(async (req, res) => {
	let response = await userController.addProjectToUser(req.params.idUser, req.body._id);
	if (response != undefined && response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

router.route('/user').post(async (req, res) => {
	let response = await userController.getUserByData(req.body);
	if (response != undefined && response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

router.route('/addUser/').post(async (req, res) => {
	let response = await userController.addUser(req.body);
	if (response != undefined && response.success == true) {
		res.status(200).json(response);
	} else {
		if (response.message == "email deja existant")
			res.status(200).json(response);
		res.status(404).json(response);
	}
});

router.route('/login').post(async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	if (user == undefined)
		res.status(200).json("email inconnu");
	else {
		bcrypt.compare(req.body.password, user.password).then(
			(response) => {
				res.status(200).json(response);
			}
		);
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