const router = require('express').Router();

const taskController = require('../controllers/taskController');

router.route('/tasks').get(async (req, res) => {
	let response = await taskController.getAllTask();
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

router.route('/addTask').post(async (req, res) => {
	let response = await taskController.addTask(req.body);
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(400).json(response);
	}
});

router.route('/task/:id').get(async (req, res) => {
	let response = await taskController.getTaskById(req.params.id);
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

router.route('/removeTask/:id').delete(async (req, res) => {
	let response = await taskController.deleteTask(req.params.id);
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

module.exports = router;