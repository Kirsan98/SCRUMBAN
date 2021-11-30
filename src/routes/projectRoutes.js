const router = require('express').Router();

const projectController = require('../controllers/projectsController');

// get all projects
router.route('/projects').get(async (req, res) => {
  let response = await projectController.getAllProjects();
  if (response.success == true) {
    res.status(200).json(response);
  } else {
    res.status(404).json(response);
  }
});

// get a project by id
router.route('/project/:id').get(async (req, res) => {
  let response = await projectController.getProjectById(req.params.id);
  if (response.success == true) {
    res.status(200).json(response);
  } else {
    res.status(404).json(response);
  }
});

// create a new project
router.route('/addProject/').post(async (req, res) => {
  let response = await projectController.addProject(req.body);
  if (response.success == true) {
    res.status(200).json(response);
  } else {
    res.status(404).json(response);
  }
});

// update a project
router.route('/updateProject/:id').put(async (req, res) => {
  let response = await projectController.updateProject(req.params.id, req.body);
  if (response.success == true) {
    res.status(200).json(response);
  } else {
    res.status(404).json(response);
  }
});

// delete a project
router.route('/removeProject/:idProject').delete(async (req, res) => {
  let response = await projectController.removeProject(req.params.idProject);
  if (response.success == true) {
    res.status(200).json(response);
  } else {
    res.status(404).json(response);
  }
});

//SPRINT

// add a sprint to project
router.route('/project/:idProject/addSprint').post(async (req, res) => {
  let response = await projectController.addSprint(req.params.idProject, req.body);
  if (response.success == true) {
    res.status(200).json(response);
  } else {
    res.status(404).json(response);
  }
});

// get a sprint from project
router.route('/project/:idProject/sprint/:idSprint').get(async (req, res) => {
  let response = await projectController.getSingleSprintByProject(req.params.idProject, req.params.idSprint);
  if (response.success == true) {
    res.status(200).json(response);
  } else {
    res.status(404).json(response);
  }
});

// get all sprints from project
router.route('/project/:idProject/sprints').get(async (req, res) => {
  let response = await projectController.getAllSprintFromProject(req.params.idProject);
  if (response.success == true) {
    res.status(200).json(response);
  } else {
    res.status(404).json(response);
  }
});

// delete a sprint from project
router.route('/project/:id1/delete-sprint/:id2').delete(async (req, res) => {
  let response = await projectController.deleteSingleSprintByProject(req.params.id1, req.params.id2);
  if (response.success == true) {
    res.status(200).json(response);
  } else {
    res.status(404).json(response);
  }
});

//TASK

// add task to project
router.route('/project/:idProject/addTask/').post(async (req, res) => {
  let response = await projectController.addTaskToProject(req.params.idProject, req.body);
  if (response.success == true) {
    res.status(200).json(response);
  } else {
    res.status(404).json(response);
  }
});

// get a task from project
router.route('/project/:idProject/task/:idTask').get(async (req, res) => {
  let response = await projectController.getTaskFromProject(req.params.idProject, req.params.idTask);
  if (response.success == true) {
    res.status(200).json(response);
  } else {
    res.status(404).json(response);
  }
});

// get all task from project
router.route('/project/:id/tasks').get(async (req, res) => {
  let response = await projectController.getAllTaskFromProject(req.params.id);
  if (response.success == true) {
    res.status(200).json(response);
  } else {
    res.status(404).json(response);
  }
});

router.route('/project/:idProject/delete-task/:idTask').delete(
  async (req, res) => {
    let response = await projectController.deleteSingleTaskByProject(req.params.idProject, req.params.idTask);
    if (response.success == true)
      res.status(200).json(response);
    else
      res.status(404).json(response);
  }
);


module.exports = router;