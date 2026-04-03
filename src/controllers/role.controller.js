const roleModel = require("../models/role.model");

// CREATE ROLE
exports.createRole = async (req, res) => {
  try {
    const { name, code, description } = req.body;

    const role = await roleModel.createRole({
      name,
      code,
      description,
    });

    res.json({
      success: true,
      data: role,
    });
  } catch (err) {
    console.log("CREATE ROLE ERROR:", err);
    res.json({
      success: false,
      message: "Error creating role",
    });
  }
};

// GET ROLES
exports.getRoles = async (req, res) => {
  try {
    const roles = await roleModel.getAllRoles();

    res.json({
      success: true,
      data: roles,
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Error fetching roles",
    });
  }
};