const router = require('express').Router();

const logController = require('../controllers/logController');

router.route('/logs').get(async (req, res) => {
	let response = await logController.getAllLogs();
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

router.route('/log/:id').get(async (req, res) => {
	let response = await logController.getLogById(req.params.id);
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

router.route('/addLog/').post(async (req, res) => {
	let response = await logController.addLog(req.body);
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

router.route('/updateLog/:id').put(async (req, res) => {
	let response = await logController.updateLog(req.params.id, req.body);
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

router.route('/removeLog/:id').delete(async (req, res) => {
	let response = await logController.removeLog(req.params.id);
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

module.exports = router;