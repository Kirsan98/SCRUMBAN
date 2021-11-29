const router = require('express').Router();

const sprintController = require('../controllers/sprintController');

// COLUMN

// add a column to sprint
router.route('/project/:idProject/sprint/:idSprint/add-column')
  .post(
    async (req, res) => {
      let response = await sprintController.addColumn(req.params.idSprint, req.body);
      if (response.success)
        res.status(200).json(response);
      else
        res.status(400).json(response);
    }
  );

// get a column from sprint
router.route('/project/:idProject/sprint/:idSprint/column/:idColumn')
  .get(
    async (req, res) => {
      let response = await sprintController.getSingleColumnByProject(req.params.idSprint, req.params.idColumn);
      if (response.success)
        res.status(200).json(response);
      else
        res.status(404).json(response);
    }
  );

// get all columns from sprint
router.route('/project/:idProject/sprint/:idSprint/columns')
  .get(async (req, res) => {
    let response = await sprintController.getAllColumnFromSprint(req.params.idSprint);
    if (response.success)
      res.status(200).json(response);
    else
      res.status(404).json(response);
  }
  );

// delete a column from sprint
router.route('/project/:idProject/sprint/:idSprint/delete-column/:idColumn')
  .delete(async (req, res) => {
    let response = await sprintController.deleteSingleColumnBySprint(req.params.idSprint, req.params.idColumn);
    if (response.success)
      res.status(200).json(response);
    else
      res.status(404).json(response);
  }
  );

  module.exports = router;