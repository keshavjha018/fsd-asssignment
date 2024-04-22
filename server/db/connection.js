const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set('runValidators', true);

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database Connected Successfully...✅");
    console.log(`----------------------------------------------------`);
  })
  .catch((e) => {
    console.log(e);
  });