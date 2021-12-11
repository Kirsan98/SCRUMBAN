const Column = require('../models/columnModel');
const Log = require('../models/logModel');
const Task = require('../models/taskModel');
const taskController = require('../controllers/taskController');
const { findByIdAndUpdate } = require('../models/columnModel');

// // Get all columns
module.exports.getAllColumns = async function () {
  let total = await Column.countDocuments({});
  let limit = parseInt(total);

  try {
    const columns = await Column.find().limit(limit);
    return {
      success: true,
      data: columns,
      total: total.toString(),
    }
  } catch (err) {
    return { success: false, message: "Columns not found " + err };
  }
}

// // Get column by Id
module.exports.getColumnById = async function (idColumn) {
  try {
    const column = await Column.findById(idColumn);
    return {
      success: true,
      data: column,
    }
  } catch (err) {
    return { success: false, message: "column not found " + err };
  }
}

// // Add a new column, returns the added column
module.exports.addColumn = async function (body) {
  const columnAdded = new Column();
  if (columnAdded == null)
    return { success: false, message: "column not added " };
  if (body != null) {
    if (body.title != null)
      columnAdded.title = body.title;
    if (body.index != null)
      columnAdded.index = body.index;
    if (body.maxTask != null)
      columnAdded.maxTask = body.maxTask;
    if (body._tasks != null)
      columnAdded._tasks = body._tasks;
    try {
      await columnAdded.save();
      return {
        success: true,
        data: columnAdded,
        message: "Add column successfully",
      }
    } catch (error) {
      return { success: false, message: "Fail to add column" + error };
    }
  }
  return { success: false, message: "Fail to add column, wrong body parameter" };
}

// // Update an existing column
module.exports.updateColumn = async function (idColumn, body) {
  const columnUpdated = await Column.findById(idColumn);
  if (columnUpdated == null)
    return { success: false, message: "column not updated " };
  if (body.title != null)
    columnUpdated.title = body.title;
  if (body.index != null)
    columnUpdated.index = body.index;
  if (body.maxTask != null)
    columnUpdated.maxTask = body.maxTask;
  if (body._tasks != null)
    columnUpdated._tasks = body._tasks;
  try {
    await columnUpdated.save();
    return {
      success: true,
      data: columnUpdated,
      message: "Column updated successfully",
    }
  } catch (error) {
    return { success: false, message: "Fail to update column" + error };
  }
}

// // Remove an existing column
module.exports.deleteColumn = async function (idColumn) {
  try {
    const column = await Column.findById(idColumn);
    column.remove();
    return {
      success: true,
      data: column,
    };
  } catch (error) {
    return { success: false, message: "Column not removed " + error };
  }
}

// // Add a task to an existing column
module.exports.addTaskToColumn = async function (idColumn, idTask) {
  try {
    const column = await Column.findById(idColumn);
    column._tasks.push(idTask);
    return {
      success: true,
      data: column,
    };
  } catch (error) {
    return { success: false, message: "task not added to the column " + error };
  }
}

// // Add a task to an existing column
module.exports.moveTaskToColumn = async function (idColumnStart, idColumnEnd, idTask) {
  try {
    await Column.findByIdAndUpdate(idColumnStart, { $pull: { _tasks: idTask } });
    const columnEnd = await Column.findByIdAndUpdate(idColumnEnd, { $push: { _tasks: idTask } });

    const log = new Log();
    log._columnIdStart = idColumnStart;
    log._columnIdEnd = idColumnEnd;
    log.updated_at = Date.now();
    log.save();

    const task = await Task.findByIdAndUpdate(idTask, { $push: { _logs: log } });
    return {
      success: true,
      data: [columnEnd, task]
    };
  } catch (error) {
    return { success: false, message: "task not added to the column " + error };
  }
}