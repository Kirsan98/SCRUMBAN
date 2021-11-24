const Column = require('../models/columnModel');

let ColumnController = {};
// Get all columns
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

// Get column by Id
module.exports.getColumnById = async function (id) {
	try {
		const column = await Column.findById(id);
		return {
			success: true,
			data: column,
		}
	} catch (err) {
		return { success: false, message: "column not found " + err };
	}
}

// Add a new column, returns the added column
module.exports.addColumn = async function (body) {
	const columnAdded = new Column();
	if (columnAdded == null)
		return { success: false, message: "column not added " };
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

// Update an existing column
module.exports.updateColumn = async function (id, body) {
	const columnUpdated = await Column.findById(id);
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

// Remove an existing column
module.exports.removeColumn = async function (id) {
	try {
		// const contact = await Contact.findByIdAndRemove(id) 
		const column = await Column.findById(id)
		column.remove();
		return {
			success: true,
			data: column,
		}
	} catch (error) {
		return { success: false, message: "Column not removed " + error };
	}
}