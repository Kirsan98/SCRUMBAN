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




module.exports = router;