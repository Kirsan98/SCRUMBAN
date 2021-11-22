const Sprint = require('../models/sprintModel');


//add new sprint 
module.exports.addSprint = async function(body){
    const sprintAdded = new Sprint();
    if(sprintAdded == null)
    return { success: false, message: "Sprint not added "};
    if (body.title!= null)
    sprintAdded.title = body.title;
    
    if (body.start_at != null)
    sprintAdded.start_at = body.start_at;

    if (body.end_at != null)
    sprintAdded.end_at = body.end_at;

    try {
    await sprintAdded.save();
    return {
        success:  true,
        data: sprintAdded,
        message: "Add successfully",
    }} catch (error){
    return { success: false, message: "Fail to add" + error};
    }
}

//get all sprints
module.exports.getAllSprints = async function(){
    let total = await Sprint.countDocuments({});
    let limit = parseInt(total);
    try {
        const Sprints = await Sprint.find().limit(limit);
        return {
            success: true,
            data: Sprints,
            total: total.toString(),
        }
    } catch (err) {
        return { success: false, message: "Project not found " + err };
    }
}

//get sprint by id
module.exports.getSprintById = async function(id){
    try{
        const sprint = await Sprint.findById(id);
        return{
            success: true,
            data: sprint,
        }
    }catch(err){
        return { success:false, message: "Project not found" +err};
    }
}

//Remove an existing sprint
module.exports.removeSprint = async function(id) {
    try { 
      const sprint = await Sprint.findById(id)
      sprint.remove();
      return {
        success: true,
        data: sprint,
      }
    } catch (error) {
        return { success: false, message: "User not removed " + error};
    }
}