// const instituteModel = require("../models/institute.model");

// // CREATE
// exports.createInstitute = async (req, res) => {
//   try {
//     const { tenant_id, name, code, type, inst_location, inst_logo } = req.body;

//     const institute = await instituteModel.createInstitute({
//       tenant_id,
//       name,
//       code,
//       type,
//       inst_location,
//       inst_logo,
//       status: "active",
//     });

//     res.json({
//       success: true,
//       data: institute,
//     });
//   } catch (err) {
//     console.log("CREATE INSTITUTE ERROR:", err);
//     res.json({
//       success: false,
//       message: "Error creating institute",
//     });
//   }
// };

// // GET ALL
// exports.getInstitutes = async (req, res) => {
//   try {
//     const institutes = await instituteModel.getAllInstitutes();

//     res.json({
//       success: true,
//       data: institutes,
//     });
//   } catch (err) {
//     res.json({
//       success: false,
//     });
//   }
// };



const instituteModel = require("../models/institute.model");

// CREATE
exports.createInstitute = async (req, res) => {
  try {

    const {
      tenant_id,
      name,
      code,
      type,
      inst_location,
      inst_logo,
    } = req.body;

    // VALIDATION
    if (!tenant_id || !name || !code) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const institute = await instituteModel.createInstitute({
      tenant_id,
      name,
      code,
      type,
      inst_location,
      inst_logo,
      status: "active",
    });

    return res.status(200).json({
      success: true,
      data: institute,
    });

  } catch (err) {

    console.log("CREATE INSTITUTE ERROR:", err);

    // DUPLICATE CODE
    if (err.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Institute code already exists",
      });
    }

    // INVALID TENANT ID
    if (err.code === "23503") {
      return res.status(404).json({
        success: false,
        message: "Invalid tenant_id",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error creating institute",
    });
  }
};

// GET ALL
exports.getInstitutes = async (req, res) => {

  try {

    const institutes = await instituteModel.getAllInstitutes();

    return res.status(200).json({
      success: true,
      data: institutes,
    });

  } catch (err) {

    console.log("GET INSTITUTE ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Error fetching institutes",
    });
  }
};