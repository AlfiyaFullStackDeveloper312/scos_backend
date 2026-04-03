const mappingModel = require("../models/userInstituteRole.model");

// CREATE
exports.createMapping = async (req, res) => {
  try {
    const { tenant_id, user_id, institute_id, role_id, is_primary } = req.body;

    const mapping = await mappingModel.createMapping({
      tenant_id,
      user_id,
      institute_id,
      role_id,
      is_primary,
    });

    res.json({
      success: true,
      data: mapping,
    });
  } catch (err) {
    console.log("CREATE MAPPING ERROR:", err);
    res.json({
      success: false,
      message: "Error creating mapping",
    });
  }
};

// GET ALL
exports.getMappings = async (req, res) => {
  try {
    const mappings = await mappingModel.getAllMappings();

    res.json({
      success: true,
      data: mappings,
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Error fetching mappings",
    });
  }
};