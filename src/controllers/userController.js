const User = require('../models/userModel');

// Get all Users
module.exports.getAllUsers = async function () {
  let total = await User.countDocuments({});
  let limit = parseInt(total);
  try {
    const Users = await User.find().limit(limit);
    return {
      success: true,
      data: Users,
      total: total.toString(),
    }
  } catch (err) {
    return { success: false, message: "Users not found " + err };
  }
}

// Get User by Id
module.exports.getUserById = async function (id) {
  try {
    const user = await User.findById(id);
    return {
      success: true,
      data: user,
    }
  } catch (err) {
    return { success: false, message: "User not found " + err };
  }
}

// Add a new User, returns the added User
module.exports.addUser = async function (body) {
  const userAdded = new User();
  if (userAdded == null)
    return { success: false, message: "User not added " };
  if (body.first_name != null)
    userAdded.first_name = body.first_name;
  if (body.last_name != null)
    userAdded.last_name = body.last_name;
  if (body.email != null) {
    const user = await User.findOne({ email: body.email });
    if (user != undefined)
      return {
        success: false,
        message: "email deja existant"
      }
    else {
      userAdded.email = body.email;
    }
  }
  if (body.username != null)
    userAdded.username = body.username;
  if (body.password != null)
    userAdded.password = body.password;
  try {
    await userAdded.save();
    return {
      success: true,
      data: userAdded,
      message: "Add successfully",
    }
  } catch (error) {
    return { success: false, message: "Fail to add" + error };
  }
}

// get a user by email
module.exports.getUserByData = async function (body) {
  try {
    let user;
    if (body.email != undefined)
      user = await User.findOne({ email: body.email });
    if (body.username != undefined)
      user = await User.findOne({ username: body.username });
    return {
      success: true,
      data: user,
    }
  }
  catch (error) {
    return {
      success: false,
      message: "Can't get user " + error,
    }
  }
}

// add a project to user 
module.exports.addProjectToUser = async function (idUser, body) {
  try {
    const user = await User.findByIdAndUpdate(idUser, { $push: { projects: body } });
    if (user != undefined) {
      return {
        success: true,
        data: user,
      };
    }
    else {
      return {
        succes: false,
        message: "User not found"
      };
    }
  } catch (error) {
    return {
      succes: false,
      message: "User not found " + error
    };
  }
}

module.exports.removeProjetToUser = async function (idUser, idProject) {
  try {
    const user = await User.findByIdAndUpdate(idUser, { $pull: { projects: idProject } });
    if (user != undefined) {
      return {
        success: true,
        data: user,
      };
    }
    else {
      return {
        succes: false,
        message: "User not found"
      };
    }
  } catch (error) {
    return {
      succes: false,
      message: "User not found " + error
    };
  }
}

// Update an existing User
module.exports.updateUser = async function (id, body) {
  const userUpdated = await User.findById(id)
  if (userUpdated == null)
    return { success: false, message: "User not updated " };
  if (body.first_name != null)
    userUpdated.first_name = body.first_name;
  if (body.last_name != null)
    userUpdated.last_name = body.last_name;
  if (body.email != null)
    userUpdated.email = body.email;
  if (body.username != null)
    userUpdated.username = body.username;
  if (body.password != null)
    userUpdated.password = body.password;
  try {
    await userUpdated.save();
    return {
      success: true,
      data: userUpdated,
      message: "Update successfully",
    }
  } catch (error) {
    return { success: false, message: "Fail to update" + error };
  }
}

// Remove an existing User
module.exports.removeUser = async function (id) {
  try {
    // const contact = await Contact.findByIdAndRemove(id) 
    const user = await User.findById(id)
    user.remove();
    return {
      success: true,
      data: user,
    }
  } catch (error) {
    return { success: false, message: "User not removed " + error };
  }
}