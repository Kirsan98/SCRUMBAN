const router = require('express').Router();

const projectController = require('../controllers/projectsController');

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

router.route('/project/:id/add-task/').post(async (req, res) => {
  let response = await projectController.addTaskToProject(req.params.id, req.body);
  if (response.success == true) {
    res.status(200).json(response);
  } else {
    res.status(404).json(response);
  }
});

router.route('/project/:idProject/task/:idTask').get(async (req, res) => {
  let response = await projectController.getTaskFromProject(req.params.idProject, req.params.idTask);
  if (response.success == true) {
    res.status(200).json(response);
  } else {
    res.status(404).json(response);
  }
});

router.route('/project/:id/tasks').get(async (req, res) => {
  let response = await projectController.getTasksFromProject(req.params.id);
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