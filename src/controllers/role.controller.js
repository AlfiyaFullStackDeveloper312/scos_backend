const roleModel = require("../models/role.model");

// CREATE ROLE
exports.createRole = async (req, res) => {

  try {

    const {
      name,
      code,
      description,
    } = req.body;

    // VALIDATION
    if (!name || !code) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const role = await roleModel.createRole({
      name,
      code,
      description,
    });

    return res.status(200).json({
      success: true,
      data: role,
    });

  } catch (err) {

    console.log("CREATE ROLE ERROR:", err);

    // DUPLICATE CODE
    if (err.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Role code already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error creating role",
    });
  }
};

// GET ROLES
exports.getRoles = async (req, res) => {

  try {

    const roles = await roleModel.getAllRoles();

    return res.status(200).json({
      success: true,
      data: roles,
    });

  } catch (err) {

    console.log("GET ROLE ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Error fetching roles",
    });
  }
};