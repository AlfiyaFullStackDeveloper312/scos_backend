// const mappingModel = require("../models/userInstituteRole.model");

// // CREATE
// exports.createMapping = async (req, res) => {
//   try {
//     const { tenant_id, user_id, institute_id, role_id, is_primary } = req.body;

//     const mapping = await mappingModel.createMapping({
//       tenant_id,
//       user_id,
//       institute_id,
//       role_id,
//       is_primary,
//     });

//     res.json({
//       success: true,
//       data: mapping,
//     });
//   } catch (err) {
//     console.log("CREATE MAPPING ERROR:", err);
//     res.json({
//       success: false,
//       message: "Error creating mapping",
//     });
//   }
// };

// // GET ALL
// exports.getMappings = async (req, res) => {
//   try {
//     const mappings = await mappingModel.getAllMappings();

//     res.json({
//       success: true,
//       data: mappings,
//     });
//   } catch (err) {
//     res.json({
//       success: false,
//       message: "Error fetching mappings",
//     });
//   }
// };

const mappingModel = require("../models/userInstituteRole.model");

// CREATE
exports.createMapping = async (req, res) => {

  try {

    const {
      tenant_id,
      user_id,
      institute_id,
      role_id,
      is_primary,
    } = req.body;

    // VALIDATION
    if (
      !tenant_id ||
      !user_id ||
      !institute_id ||
      !role_id
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    // BOOLEAN VALIDATION
    if (
      typeof is_primary !== "boolean"
    ) {
      return res.status(400).json({
        success: false,
        message: "is_primary must be true or false",
      });
    }

    const mapping = await mappingModel.createMapping({
      tenant_id,
      user_id,
      institute_id,
      role_id,
      is_primary,
    });

    return res.status(200).json({
      success: true,
      data: mapping,
    });

  } catch (err) {

    console.log("CREATE MAPPING ERROR:", err);

    // FOREIGN KEY ERROR
    if (err.code === "23503") {
      return res.status(404).json({
        success: false,
        message: "Invalid foreign key",
      });
    }

    // DUPLICATE ERROR
    if (err.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Duplicate mapping",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error creating mapping",
    });
  }
};

// GET ALL
exports.getMappings = async (req, res) => {

  try {

    const mappings = await mappingModel.getAllMappings();

    return res.status(200).json({
      success: true,
      data: mappings,
    });

  } catch (err) {

    console.log("GET MAPPINGS ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Error fetching mappings",
    });
  }
};