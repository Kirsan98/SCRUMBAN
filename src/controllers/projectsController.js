const Project = require('../models/projectModel');
const Sprint = require('../models/sprintModel');

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
    // if (body.updated_at != null)
    // projectAdded.updated_at = body.updated_at;
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
    
    try {
    await sprintAdded.save();

    const project = await Project.findByIdAndUpdate(id,
       {$push: {sprints:sprintAdded} });
    return {
        success:  true,
        data: project,

        message: "Add successfully",
    }} catch (error){
    return { success: false, message: "Fail to add" + error};
    }
}


//get project by id with sprints
module.exports.getProjectById = async function(id){
    try {
    const project = await Project.findByIdAndUpdate(id).populate("sprints");
    return {
        success:  true,
        data: project,

        message: "Add successfully",
    }} catch (error){
    return { success: false, message: "Fail to add" + error};
    }
}


// get sprint by id 
module.exports.getSingleSprintByProject = async function(id1,id2){
    // try {
    //     const project = await Project.findByIdAndUpdate(id1).populate("sprints");

    //     return {
    //         success:  true,
    //         data: project,
    
    //         message: "Add successfully",
    //     }} catch (error){
    //     return { success: false, message: "Fail to add" + error};
    //     }
}

