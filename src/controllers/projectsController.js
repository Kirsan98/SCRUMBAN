const Project = require('../models/projectModel');

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
    if (body.created_at != null)
    projectAdded.created_at = body.created_at;
    if (body.updated_at != null)
    projectAdded.updated_at = body.updated_at;
    if (body._members != null)
    projectAdded._members = body._members;
    if (body._tasks != null)
    projectAdded._tasks = body._tasks;
    if (body._sprints != null)
    projectAdded._sprints = body._sprints;

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