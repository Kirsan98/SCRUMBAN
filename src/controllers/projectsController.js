const Project = require('../models/projectModel');
const sprintController = require('../controllers/sprintController');
const taskController = require('../controllers/taskController');
const columnController = require('../controllers/columnController');
const userController = require('../controllers/userController');
const User = require('../models/userModel');
const Sprint = require('../models/sprintModel');

//get all projects
module.exports.getAllProjects = async function () {
	let total = await Project.countDocuments({});
	let limit = parseInt(total);
	try {
		const Projects = await Project.find().limit(limit);
		return {
			success: true,
			data: Projects,
			total: total.toString(),
		}
	} catch (err) {
		return { success: false, message: "Project not found " + err };
	}
}

//get all projects from user
module.exports.getAllProjectsFromUser = async function (idUser) {
	try {
		const user = await User.findById(idUser);
		if (user != null) {
			let projects = [];
			await Promise.all(user.projects.map(
				async (projectId) => {
					const project = await this.getProjectById(projectId);
					if (project != undefined && project.success)
						projects.push(project.data);
				}
			));
			return {
				success: true,
				data: projects
			};
		}

	} catch (error) {
		return { success: false, message: "User not found " + error };
	}
}

//get project by id with sprints
module.exports.getProjectById = async function (idProject) {
	try {
		const project = await Project.findById(idProject);
		return {
			success: true,
			data: project,

		}
	} catch (error) {
		return { success: false, message: "Project not found" + error };
	}
}

//add new Project 
module.exports.addProject = async function (body) {
	const projectAdded = new Project();
	if (projectAdded == null)
		return { success: false, message: "Project not added " };
	if (body.title != null)
		projectAdded.title = body.title;
	if (body._members != null)
		projectAdded._members = body._members;
	projectAdded.created_at = Date.now();
	projectAdded.updated_at = null;
	if (body.password != null)
		projectAdded.password = body.password;
	try {
		await projectAdded.save();
		return {
			success: true,
			data: projectAdded,
			message: "Add successfully",
		}
	} catch (error) {
		return { success: false, message: "Fail to add" + error };
	}
}

// add a user to project
module.exports.addUserToProject = async function (idProject, idUser) {
	try {
		const project = await Project.findByIdAndUpdate(idProject,
			{ $push: { _members: idUser } }
		);
		return {
			success: true,
			data: project,
			message: "Add successfully",
		}
	} catch (error) {
		return { success: false, message: "Fail to add" + error };
	}
}

//Update an existing Project
module.exports.updateProject = async function (id, body) {
	const projectUpdated = await Project.findById(id)
	if (projectUpdated == null)
		return { success: false, message: "Project not updated" };
	projectUpdated.updated_at = Date.now();
	if (body.title != null)
		projectUpdated.title = body.title;
	if (body.sprints != null)
		projectUpdated.sprints = body.sprints;
	if (body._members != null)
		projectUpdated._members = body._members;
	try {
		await projectUpdated.save();
		return {
			success: true,
			data: projectUpdated,
			message: "Update successfully",
		}
	} catch (error) {
		return { success: false, message: "Fail to update" + error };
	}
}

//Remove an existing project
module.exports.removeProject = async function (id) {
	try {
		const project = await Project.findById(id);
		const tasks = project.tasks;
		if (tasks != null)
			tasks.forEach(async element =>
				taskController.deleteTask(element)
			);
		const sprints = project.sprints;
		if (sprints != null)
			sprints.forEach(async element => {
				sprintController.deleteSprint(element);
			});
		const members = project._members;
		if (members != null)
			members.forEach(async idUser => {
				userController.removeProjetToUser(idUser, project._id);
			});
		project.remove();
		return {
			success: true,
			data: project,
		}
	} catch (error) {
		return { success: false, message: "Project not removed " + error };
	}
}

// get users working on the project
module.exports.getAllUsersFromProject = async function (idProject) {
	try {
		const project = await Project.findById(idProject);
		const users = project._members;
		if (users != null)
			return {
				success: true,
				data: users,
			};
		else {
			return {
				success: false,
				message: "No users found in this project"
			};
		}
	} catch (error) {
		return { success: false, message: "Project not find " + error };
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
// SPRINT

// create sprint
module.exports.addSprint = async function (idProject, body) {
	try {
		const sprintData = await sprintController.addSprint(body);
		if (sprintData.success) {
			const project = await Project.findByIdAndUpdate(idProject,
				{ $push: { sprints: sprintData.data._id } });
			return {
				success: true,
				data: {
					"project": project,
					"sprint": sprintData.data
				},
				message: "Add sprint successfully",
			};
		}
	}
	catch (error) {
		return { success: false, message: "Fail to add" + error };
	}
}

// get sprint by id 
module.exports.getSingleSprintByProject = async function (idProject, idSprint) {
	try {
		const sprintData = await sprintController.getSprintById(idSprint);
		if (sprintData.success)
			return {
				success: true,
				data: sprintData.data,
			};
	} catch (error) {
		return { success: false, message: "Not found" + error };
	}
}

// get all sprints from project
module.exports.getAllSprintFromProject = async function (idProject) {
	try {
		const project = await Project.findById(idProject);
		if (project != null) {
			let sprints = [];
			await Promise.all(project.sprints.map(
				async (element) => {
					const sprint = await sprintController.getSprintById(element);
					if (sprint.success)
						sprints.push(sprint.data);
				}
			));
			return {
				success: true,
				data: sprints,
			};
		}
	} catch (error) {
		return { success: false, message: "Project not found " + error };
	}
};



// delete sprint by id 
module.exports.deleteSingleSprintByProject = async function (idProject, idSprint) {
	try {
		const project = await Project.findByIdAndUpdate(
			idProject,
			{ $pull: { sprints: idSprint } }
		);
		sprintController.deleteSprint(idSprint);
		return {
			success: true,
			message: "sprint delete with success",
		};
	} catch (error) {
		return { success: false, message: "Not found" + error };
	}
}


///////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
// TASK

// Create task to an existing project 
module.exports.addTaskToProject = async function (idProject, body) {

	try {
		const taskAdded = await taskController.addTask(body);
		if (taskAdded.success == false)
			return {
				success: false,
				message: "Fail to create task",
			};
		const project = await Project.findById(idProject);
		project.tasks.push(taskAdded.data._id);
		project.save();
		return {
			success: true,
			data: project,
			message: "Add successfully",
		}
	} catch (error) {
		return { success: false, message: "Fail to add task " + error };
	}
}

// Get task from an existing project 
module.exports.getTaskFromProject = async function (idProject, idTask) {
	try {
		const task = await taskController.getTaskById(idTask);
		if (task.success == true)
			return {
				success: true,
				data: task.data,
				message: "Get task from project is success",
			};
		else
			return {
				success: false,
				message: "fail to get task from project",
			};
	} catch (error) {
		return { success: false, message: "Fail to get task from project " + error };
	}
}

// Get all task from an existing project 
module.exports.getAllTaskFromProject = async function (idProject) {
	try {
		const project = await Project.findById(idProject);
		if (project != null) {
			let tasks = [];
			await Promise.all(project.tasks.map(
				async (element) => {
					const task = await taskController.getTaskById(element);
					if (task.success)
						tasks.push(task.data);
				}
			));
			return {
				success: true,
				data: tasks,
				message: "Get task from project is success",
			};
		}
		else
			return {
				success: false,
				message: "Get task from project is failure",
			};
	} catch (error) {
		return { success: false, message: "Fail to get task from project " + error };
	}
}

// delete a task from project
module.exports.deleteSingleTaskByProject = async function (idProject, idTask) {
	try {
		const project = await Project.findByIdAndUpdate(
			idProject,
			{ $pull: { tasks: idTask } }
		);
		taskController.deleteTask(idTask);
		return {
			success: true,
			message: "task delete with success",
		};
	} catch (error) {
		return { success: false, message: "Not found" + error };
	}
}


