const express = require("express");

const userRoutes = require("./user.routes");
const projectRoutes = require("./project.routes");
const componentRoutes = require("./component.routes");

//-----INSTANCE------
const router = new express.Router();


router.get('/', async (req, res) => {
  res.json({ status: "Success" });
});


router.use("/api/user", userRoutes);
router.use("/api/project", projectRoutes);
router.use("/api/comp", componentRoutes);

module.exports = router;