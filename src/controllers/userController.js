const User = require('../models/userModel');

// Get all Users
module.exports.getAllUsers = async function() {
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
module.exports.getUserById = async function(id) {
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
module.exports.addUser = async function(body) {
    const userAdded = new User();
    if(userAdded == null)
    return { success: false, message: "User not added "};
    if( body.first_name!= null)
    userAdded.first_name = body.first_name;
    if( body.last_name!= null)
    userAdded.last_name = body.last_name;
    if( body.email!=null)
    userAdded.email = body.email;
    if( body.username!= null)
    userAdded.username = body.username;
    if( body.password!=null)
    userAdded.password = body.password;
    try {
    await userAdded.save();
    return {
        success: true,
        data: userAdded,
        message: "Add successfully", 
    }} catch (error) {
    return { success: false, message: "Fail to add" + error};
    }
}
 
// Update an existing User
module.exports.updateUser = async function(id, body) {
    const userUpdated = await User.findById(id)
    if(userUpdated == null)
    return { success: false, message: "User not updated "};
    if( body.first_name!= null)
    userUpdated.first_name = body.first_name;
    if( body.last_name!= null)
    userUpdated.last_name = body.last_name;
    if( body.email!=null)
    userUpdated.email = body.email;
    if( body.username!= null)
    userUpdated.username = body.username;
    if( body.password!=null)
    userUpdated.password = body.password;
    try {
    await userUpdated.save();
    return {
        success: true,
        data: userUpdated,
        message: "Update successfully", 
    }} catch (error) {
    return { success: false, message: "Fail to update" + error};
    }
}
    
// Remove an existing User
module.exports.removeUser = async function(id) {
    try { 
      // const contact = await Contact.findByIdAndRemove(id) 
      const user = await User.findById(id)
      user.remove();
      return {
        success: true,
        data: user,
      }
    } catch (error) {
        return { success: false, message: "User not removed " + error};
    }
  }