const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const instituteRoutes = require("./routes/institute.routes");
const roleRoutes = require("./routes/role.routes");
const mappingRoutes = require("./routes/userInstituteRole.routes");

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/institutes", instituteRoutes);
app.use("/roles", roleRoutes);
app.use("/user-institute-roles", mappingRoutes);

module.exports = app;