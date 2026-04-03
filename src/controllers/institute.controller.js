const instituteModel = require("../models/institute.model");

// CREATE
exports.createInstitute = async (req, res) => {
  try {
    const { tenant_id, name, code, type } = req.body;

    const institute = await instituteModel.createInstitute({
      tenant_id,
      name,
      code,
      type,
    });

    res.json({
      success: true,
      data: institute,
    });
  } catch (err) {
    console.log("CREATE INSTITUTE ERROR:", err);
    res.json({
      success: false,
      message: "Error creating institute",
    });
  }
};

// GET ALL
exports.getInstitutes = async (req, res) => {
  try {
    const institutes = await instituteModel.getAllInstitutes();

    res.json({
      success: true,
      data: institutes,
    });
  } catch (err) {
    res.json({
      success: false,
    });
  }
};