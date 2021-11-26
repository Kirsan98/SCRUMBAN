const Project = require('../models/projectModel');
const Sprint = require('../models/sprintModel');
const Column = require('../models/columnModel')
const Task = require('../models/taskModel');
const TaskController = require('../controllers/taskController');

//get all projects
module.exports.getAllProjects = async function(){
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

//add new Project 
module.exports.addProject = async function(body){
    const projectAdded = new Project();
    if(projectAdded == null)
    return { success: false, message: "Project not added "};
    if (body.title!= null)
    projectAdded.title = body.title;
    projectAdded.created_at = Date.now();
    projectAdded.updated_at = null;
    if( body.password!=null)
    projectAdded.password = body.password;
    // if (body._members != null)
    // projectAdded._members = body._members;
    try {
    await projectAdded.save();
    return {
        success:  true,
        data: projectAdded,
        message: "Add successfully",
    }} catch (error){
    return { success: false, message: "Fail to add" + error};
    }
}

//Update an existing Project
module.exports.updateProject = async function(id,body){
    const projectUpdated = await Project.findById(id)
    if(projectUpdated == null)
    return { success: false, message: "Project not updated"};
    projectUpdated.updated_at = Date.now();
    if (body.title != null)
    projectUpdated.title = body.title;
    if (body.sprints != null)
    projectUpdated.sprints = body.sprints;
    try{
        await projectUpdated.save();
        return{
            success: true,
            data: projectUpdated,
            message: "Update successfully",
        }
    }catch(error){
            return {success: false, message:"Fail to update"+ error};
        }
}

//Remove an existing project
module.exports.removeProject = async function(id) {
    try { 
      const project = await Project.findById(id)
      project.remove();
      return {
        success: true,
        data: project,
      }
    } catch (error) {
        return { success: false, message: "User not removed " + error};
    }
}

// create sprint
module.exports.addSprint = async function(id,body){
    const sprintAdded = new Sprint();
    if(sprintAdded == null)
    return { success: false, message: "Sprint not added "};
    if (body.title!= null)
    sprintAdded.title = body.title;
    if (body.start_at !=null)
    sprintAdded.start_at = body.start_at;
    if (body.end_at !=null)
    sprintAdded.end_at = body.end_at;
    if (body.planningDaily != null)
    sprintAdded.planningDaily = body.planningDaily;
    if (body.sprintRetrospective != null)
    sprintAdded.sprintRetrospective = body.sprintRetrospective;
    try {
    await sprintAdded.save();

    const project = await Project.findByIdAndUpdate(id,
       {$push: {sprints:sprintAdded} });
       // add modif de KG
    return {
        success:  true,
        data: project,

        message: "Add successfully",
    }} catch (error){
    return { success: false, message: "Fail to add" + error};
    }
}

// Create task to an existing project 
module.exports.addTaskToProject = async function(id,body){
    const taskAdded = TaskController.addTask(body);
    try {
    const project = await Project.findById(id).populate("tasks");
    project.tasks.push(taskAdded);
    project.save();
    return {
        success:  true,
        data: project,
        message: "Add successfully",
    }} catch (error){
    return { success: false, message: "Fail to add task " + error};
    }
}

// Get task from an existing project 
module.exports.getTaskFromProject = async function(idProject, idTask){
    try {
    const project = await Project.findById(idProject).populate("tasks");
    let task;
    project.tasks.forEach(element => {
        if(element._id == idTask){
            task = element; 
        }
    });
    return {
        success:  true,
        data: task,
        message: "Get task from project is success",
    }} catch (error){
    return { success: false, message: "Fail to get task from project " + error};
    }
}

// Get task from an existing project 
module.exports.getTasksFromProject = async function(idProject){
    try {
    const project = await Project.findById(idProject).populate("tasks");
    return {
        success:  true,
        data: project.tasks,
        message: "Get task from project is success",
    }} catch (error){
    return { success: false, message: "Fail to get task from project " + error};
    }
}

//get project by id with sprints
module.exports.getProjectById = async function(id){
    try {
    const project = await Project.findByIdAndUpdate(id).populate("sprints");
    return {
        success:  true,
        data: project,

    }} catch (error){
    return { success: false, message: "Project not found" + error};
    }
}


// get sprint by id 
module.exports.getSingleSprintByProject = async function(idProject,idSprint){
    try {
        const project = await Project.findById(idProject).populate("sprints");
        const sprints = project.sprints;
        let sprint;
        sprints.forEach(element => {
            if (element._id == idSprint){
                sprint = element;
            }
        });

        return {
            success:  true,
            data: sprint,
    
        }} catch (error){
        return { success: false, message: "Not found" + error};
        }
}



// delete sprint by id 
module.exports.deleteSingleSprintByProject = async function(idProject,idSprint){
    try {
        const project = await Project.findById(idProject).populate("sprints");
        const sprints = project.sprints;
        let sprint;
        sprints.forEach(element => {
            if (element._id == idSprint){
                sprint = element;
                sprint.remove();
            }
        });
        
        return {
            success:  true,
    
        }} catch (error){
        return { success: false, message: "Not found" + error};
        }
}