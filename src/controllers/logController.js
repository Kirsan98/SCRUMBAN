const Log = require('../models/logModel');

// Get all columns
module.exports.getAllLogs = async function() {
    let total = await Log.countDocuments({});
    let limit = parseInt(total);

    try {
        const logs = await Log.find().limit(limit);
        return {
            success: true,
            data: logs,
            total: total.toString(),
        }
    } catch (err) {
        return { success: false, message: "Logs not found " + err };
    }
}

// Get column by Id
module.exports.getLogById = async function(id) {
    try {
        const log = await Log.findById(id);
        return {
            success: true,
            data: log,
        }
    } catch (err) {
        return { success: false, message: "Log not found " + err };
    }
}

// Add a new log
module.exports.addLog = async function(body) {
    const logAdded = new Log();
    if(logAdded == null)
        return { success: false, message: "Log not added "};
    if( body._userId!= null)
        logAdded._userId = body._userId;
    if( body._columnIdStart!= null)
        logAdded._columnIdStart= body._columnIdStart;
    if( body._columnIdEnd!=null)
        logAdded._columnIdEnd = body._columnIdEnd;
    if( body.updated_at!=null)
        logAdded.updated_at = body.updated_at;
    try {
    await logAdded.save();
    return {
        success: true,
        data: logAdded,
        message: "Log added successfully", 
    }} catch (error) {
    return { success: false, message: "Fail to add log" + error};
    }
}

// Update an existing log
module.exports.updateLog = async function(id, body) {
    const logUpdated = await Log.findById(id)
    if(logUpdated == null)
        return { success: false, message: "Log not updated "};
    if( body._userId!= null)
    logUpdated._userId = body._userId;
    if( body._columnIdStart!= null)
    logUpdated._columnIdStart = body._columnIdStart;
    if( body._columnIdEnd!=null)
    logUpdated._columnIdEnd = body._columnIdEnd;
    if( body.updated_at!= null)
    logUpdated.updated_at = body.updated_at;
    try {
    await logUpdated.save();
    return {
        success: true,
        data: logUpdated,
        message: "Log updated successfully", 
    }} catch (error) {
    return { success: false, message: "Fail to update log" + error};
    }
}

// Remove an existing log
module.exports.removeLog = async function(id) {
    try { 
    	const log = await Log.findByIdAndRemove(id);
      return {
        success: true,
        data: log,
      }
    } catch (error) {
        return { success: false, message: "Log not removed " + error};
    }
}