const express = require("express");
const app = express();

app.use("/static",express.static("uploads"));

app.listen(80, () => {
  console.log("listen umm..umm..um...");
}); 