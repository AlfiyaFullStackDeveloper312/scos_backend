// const bcrypt = require("bcrypt");
// const userModel = require("../models/user.model");

// // CREATE USER
// exports.createUser = async (req, res) => {
//   try {
//     const { first_name, last_name, email, mobile, password } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await userModel.createUser({
//       first_name,
//       last_name,
//       email,
//       mobile,
//       password_hash: hashedPassword,
//     });

//     res.json({
//       success: true,
//       data: user,
//     });
//   } catch (err) {
//     console.log(err);
//     res.json({
//       success: false,
//       message: "Error creating user",
//     });
//   }
// };
// // GET USERS
// exports.getUsers = async (req, res) => {
//   try {
//     const users = await userModel.getAllUsers();

//     res.json({
//       success: true,
//       data: users,
//     });
//   } catch (err) {
//   console.log("CREATE USER ERROR:", err); v

//   res.json({
//     success: false,
//     message: "Error creating user",
//   });
// }
// };
const bcrypt = require("bcrypt");

const userModel = require("../models/user.model");

// EMAIL REGEX
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// CREATE USER
exports.createUser = async (req, res) => {

  try {

    const {
      first_name,
      last_name,
      email,
      mobile,
      password,
    } = req.body;

    // VALIDATION
    if (
      !first_name ||
      !last_name ||
      !email ||
      !mobile ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    // EMAIL VALIDATION
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // XSS / dangerous input validation
    const unsafePattern = /<[^>]*>/i;
    if (
      unsafePattern.test(first_name) ||
      unsafePattern.test(last_name) ||
      unsafePattern.test(email) ||
      unsafePattern.test(mobile)
    ) {
      return res.status(400).json({
        success: false,
        message: "Unsafe input detected",
      });
    }

    // LENGTH VALIDATION
    if (first_name.length > 255 || last_name.length > 255) {
      return res.status(400).json({
        success: false,
        message: "Payload too large",
      });
    }

    // PASSWORD VALIDATION
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password too weak",
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.createUser({
      first_name,
      last_name,
      email,
      mobile,
      password_hash: hashedPassword,
    });

    // REMOVE PASSWORD HASH
    delete user.password_hash;

    return res.status(200).json({
      success: true,
      data: user,
    });

  } catch (err) {

    console.log("CREATE USER ERROR:", err);

    // DUPLICATE EMAIL
    if (err.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error creating user",
    });
  }
};

// GET USERS
exports.getUsers = async (req, res) => {

  try {

    const users = await userModel.getAllUsers();

    return res.status(200).json({
      success: true,
      data: users,
    });

  } catch (err) {

    console.log("GET USERS ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Error fetching users",
    });
  }
};