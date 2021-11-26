const router = require('express').Router();

// const taskController = require('../controllers/taskController');
const userController = require('../controllers/userController');
const columnController = require('../controllers/columnController');
const logController = require('../controllers/logController');
const projectController = require('../controllers/projectsController');

router.get('/', function (req, res) {
	res.status(200).json({
		status: 'API is Working',
		message: 'Welcome!',
	});
});

// USER //


// COLUMN // 


// TASK //



// LOG // 



// PROJECTS


router.route('/project/:id1/sprint/:id2/add-column').post(async (req, res) => {
	let response = await projectController.addColumn(req.params.id1, req.params.id2,req.body);
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});


module.exports = router;