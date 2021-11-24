const router = require('express').Router();

const taskController = require('../controllers/taskController');
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

// COLUMN // 
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
})

// TASK //

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

// LOG // 
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


// PROJECTS
router.route('/projects').get(async (req, res) => {
	let response = await projectController.getAllProjects();
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

router.route('/projects/:id').get(async (req, res) => {
	let response = await projectController.getProjectById(req.params.id);
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

router.route('/addProject/').post(async (req, res) => {
	let response = await projectController.addProject(req.body);
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

router.route('/updateProject/:id').put(async (req, res) => {
	let response = await projectController.updateProject(req.params.id, req.body);
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

router.route('/removeProject/:id').delete(async (req, res) => {
	let response = await projectController.removeProject(req.params.id);
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

router.route('/addSprint/:id').post(async (req, res) => {
	let response = await projectController.addSprint(req.params.id, req.body);
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

router.route('/project/:id1/sprint/:id2').get(async (req, res) => {
	let response = await projectController.getSingleSprintByProject(req.params.id1, req.params.id2);
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

router.route('/project/:id1/delete_sprint/:id2').delete(async (req, res) => {
	let response = await projectController.deleteSingleSprintByProject(req.params.id1, req.params.id2);
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

module.exports = router;