const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

//  ROUTES  
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const instituteRoutes = require("./routes/institute.routes");
const roleRoutes = require("./routes/role.routes");
const userInstituteRoleRoutes = require("./routes/userInstituteRole.routes");

//  USE ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/institutes", instituteRoutes);
app.use("/roles", roleRoutes);
app.use("/user-institute-roles", userInstituteRoleRoutes);

//  TEST
app.get("/", (req, res) => {
  res.send("SCOS Backend Running 🚀");
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});