const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

// CREATE USER
exports.createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, mobile, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.createUser({
      first_name,
      last_name,
      email,
      mobile,
      password_hash: hash,
    });

    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Error creating user",
    });
  }
};

// GET USERS
exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();

    res.json({
      success: true,
      data: users,
    });
  } catch (err) {
  console.log("CREATE USER ERROR:", err); v

  res.json({
    success: false,
    message: "Error creating user",
  });
}
};