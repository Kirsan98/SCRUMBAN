const Task = require('../models/taskModel');

// Get all tasks
module.exports.getAllTask = async function () {
    let total = await Task.countDocuments({});
    let limit = parseInt(total);

    try {
      const tasks = await Task.find().limit(limit);
      return {
        success: true,
        data: tasks,
        total: total.toString(),
      }
    } catch (err) {
      return { success: false, message: "Taks not found " + err };
    }
  }

// Get task by Id
module.exports.getTaskById = async function (id) {
  try {
    const task = await Task.findById(id);
    return {
      success: true,
      data: task,
    }
  } catch (err) {
    return { success: false, message: "Task not found " + err };
  }
}

// Add a new Task, returns the added task
module.exports.addTask = async function (body) {
  const taskAdded = new Task();
  if (body != null) {
    if (body.title != null)
      taskAdded.title = body.title;
    if (body.color != null)
      taskAdded.color = body.color;
    if (body.description != null)
      taskAdded.description = body.description;
    if (body.state != null)
      taskAdded.state = body.state;
    if (body._owner != null)
      taskAdded._owner = body._owner;
    if (body.created_at != null)
      taskAdded.created_at = body.created_at;
    if (body.estimated_duration != null)
      taskAdded.estimated_duration = body.estimated_duration;
    if (body._logs != null)
      taskAdded._logs = body._logs;
  }
  try {
    await taskAdded.save();
    return {
      success: true,
      data: taskAdded,
      message: "Task added successfully",
    }
  } catch (error) {
    return { success: false, message: "Fail to add task " + error };
  }
}

// // Update an existing task
// module.exports.updateTask = async function(idTask, body){
//   const taskUpdated = await Task.findById(idTask);

// }