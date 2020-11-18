const mongoose = require("mongoose");

module.exports = (async() => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
})();

