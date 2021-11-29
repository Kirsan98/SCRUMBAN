const Sprint = require('../models/sprintModel');

// Get all sprints

module.exports.getAllSprints = async function () {
  let total = await Sprint.countDocuments({});
  let limit = parseInt(total);

  try {
    const sprints = await Sprint.find().limit(limit);
    return {
      success: true,
      total: total.toString(),
      data: sprints,
    };
  } catch (error) {
    return {
      success: false,
      message: "Sprints not found " + error
    };
  }
};

// Get sprint by id
module.exports.getSprintById = async function (idSprint) {
  try {
    const sprint = await Sprint.findById(idSprint);
    return {
      success: true,
      data: sprint,
    };
  } catch (error) {
    return {
      success: false,
      message: "Sprints not found " + error
    };
  }
};

// Add a new sprint
module.exports.addSprint = async function (body) {
  const sprintAdded = new Sprint();
  if (sprintAdded == null)
    return { success: false, message: "Sprint not added " };
  if (body != null) {
    if (body.title != null)
      sprintAdded.title = body.title;
    if (body.start_at != null)
      sprintAdded.start_at = body.start_at;
    if (body.end_at != null)
      sprintAdded.end_at = body.end_at;
    if (body._user != null)
      sprintAdded._user = body._user;
    if (body.columns != null)
      sprintAdded.columns = body.columns;
    if (body.planningDaily != null)
      sprintAdded.planningDaily = body.planningDaily;
    if (body.sprintRetrospective != null)
      sprintAdded.sprintRetrospective = body.sprintRetrospective;

    try {
      await sprintAdded.save();
      return {
        success: true,
        data: sprintAdded,
        message: "Sprint added successfully",
      };
    } catch (error) {
      return { success: false, message: "Fail to add sprint " + error };
    }
  }
  return {success: false, message: "Fail to add sprint, wrong body parameter"};
};


// Update an existing sprint
module.exports.updateSprint = async function (idSprint, body) {
  const sprintUpdated = await Sprint.findById(idSprint);
  if (sprintUpdated == null)
    return { success: false, message: "Sprint not updated" };
  if (body != null) {
    if (body.title != null)
      sprintUpdated.title = body.title;
    if (body.start_at != null)
      sprintUpdated.start_at = body.start_at;
    if (body.end_at != null)
      sprintUpdated.end_at = body.end_at;
    if (body._user != null)
      sprintUpdated._user = body._user;
    if (body.columns != null)
      sprintUpdated.columns = body.columns;
    if (body.planningDaily != null)
      sprintUpdated.planningDaily = body.planningDaily;
    if (body.sprintRetrospective != null)
      sprintUpdated.sprintRetrospective = body.sprintRetrospective;

    try {
      await sprintUpdated.save();
      return {
        success: true,
        data: sprintUpdated,
        message: "Sprint updated successfully",
      };
    } catch (error) {
      return { success: false, message: "Fail to update sprint " + error };
    }
  }
  return {success: false, message: "Fail to update sprint, wrong body parameter"};
};


// delete a sprint
module.exports.deleteSprint = async function (idSprint) {
  try {
    const sprint = await Sprint.findById(idSprint);
    sprint.remove();
    return { success: true, data: sprint};
  } catch (error) {
    return { success: false, message: "Sprint not removed " + error };
  }
};