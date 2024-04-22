const express = require("express");

const userRoutes = require("./user.routes");

//-----INSTANCE------
const router = new express.Router();


router.get('/', async (req, res) => {
  res.json({ status: "Success" });
});


router.use("/api/user", userRoutes);

module.exports = router;