const router = require('express').Router();

const columnController = require('../controllers/columnController');

router.route('/columns').get(async (req, res) => {
	let response = await columnController.getAllColumns();
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

router.route('/column/:id').get(async (req, res) => {
	let response = await columnController.getColumnById(req.params.id);
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

router.route('/addColumn/').post(async (req, res) => {
	let response = await columnController.addColumn(req.body);
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

router.route('/updateColumn/:id').put(async (req, res) => {
	let response = await columnController.updateColumn(req.params.id, req.body);
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

router.route('/removeColumn/:id').delete(async (req, res) => {
	let response = await columnController.removeColumn(req.params.id);
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

router.route('/column/:idColumn/addTask/:idTask').post(async (req, res) => {
	let response = await columnController.addTaskToColumn(req.params.idColumn, req.params.idTask);
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

router.route('/move-task/:idColumnStart/:idColumnEnd/:idTask').post(async (req, res) => {
	let response = await columnController.moveTaskToColumn(req.params.idColumnStart, req.params.idColumnEnd, req.params.idTask);
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

module.exports = router;