const router = require('express').Router();
const { getAllUsers, getUserById, updateUser, removeUser, addUser } = require('../controllers/userController');
const { getAllColumns, getColumnById, updateColumn, removeColumn, addColumn } = require('../controllers/columnController');

router.get('/', function (req, res) {
    res.status(200).json({
        status: 'API is Working',
        message: 'Welcome!',
    });
});

// USER //
router.route('/users').get(async (req, res) => {
    let response = await getAllUsers();
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

router.route('/user/:id').get(async (req, res) => {
    let response = await getUserById(req.params.id);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

router.route('/addUser/').post(async (req, res) => {
    let response = await addUser(req.body);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

router.route('/updateUser/:id').put(async (req, res) => {
    let response = await updateUser(req.params.id, req.body);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

router.route('/removeUser/:id').delete(async (req, res) => {
    let response = await removeUser(req.params.id);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

// COLUMN // 
router.route('/columns').get(async (req, res) => {
    let response = await getAllColumns();
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

router.route('/column/:id').get(async (req, res) => {
    let response = await getColumnById(req.params.id);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

router.route('/addColumn/').post(async (req, res) => {
    let response = await addColumn(req.body);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

router.route('/updateColumn/:id').put(async (req, res) => {
    let response = await updateColumn(req.params.id, req.body);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

router.route('/removeColumn/:id').delete(async (req, res) => {
    let response = await removeColumn(req.params.id);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

module.exports = router;