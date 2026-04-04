const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authModel = require("../models/auth.model");

const SECRET = "secretkey";

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authModel.getUserByEmail(email);

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        user_id: user.id,
        email: user.email,
        token_type: "pre_context",
      },
      SECRET,
      { expiresIn: "8h" },
    );

    res.json({
      success: true,
      message: "Login successful",
      pre_context_token: token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.json({
      success: false,
      message: "Login failed",
    });
  }
};

//  GET INSTITUTES + ROLES
exports.getMyInstitutesRoles = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const rows = await authModel.getInstitutesRolesByUser(user_id);

    const grouped = {};

    rows.forEach((row) => {
      if (!grouped[row.institute_id]) {
        grouped[row.institute_id] = {
          tenant_id: row.tenant_id,
          institute_id: row.institute_id,
          //   institute_name: row.institute_name,
        name: row.name,
inst_location: row.inst_location,
inst_logo: row.inst_logo,
          type: row.type,
          roles: [],
        };
      }

      grouped[row.institute_id].roles.push({
        role_id: row.role_id,
        role_name: row.role_name,
      });
    });

    res.json({
      success: true,
      data: Object.values(grouped),
    });
  } catch (err) {
    console.log("GET INSTITUTES ERROR:", err);

    res.json({
      success: false,
      message: "Error fetching institutes",
    });
  }
};
//  SELECT CONTEXT
exports.selectContext = async (req, res) => {
  try {
    const { tenant_id, institute_id, role_id } = req.body;
    const user_id = req.user.user_id;

    const check = await authModel.checkUserContext(
      user_id,
      tenant_id,
      institute_id,
      role_id,
    );
    if (!check) {
      return res.json({
        success: false,
        message: "Invalid context",
      });
    }

    const accessToken = jwt.sign(
      {
        user_id,
        tenant_id,
        institute_id,
        role_id,
        token_type: "access",
      },
      SECRET,
      { expiresIn: "8h" },
    );

    res.json({
      success: true,
      message: "Context selected",
      access_token: accessToken,
      selected_context: {
        tenant_id,
        institute_id,
        role_id,
      },
    });
  } catch (err) {
    console.log("SELECT CONTEXT ERROR:", err);

    res.json({
      success: false,
      message: "Error selecting context",
    });
  }
};

//  GET CURRENT USER
exports.getMe = async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user,
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Error fetching user",
    });
  }
};

//  LOGOUT
exports.logout = async (req, res) => {
  res.json({
    success: true,
    message: "Logged out",
  });
};
