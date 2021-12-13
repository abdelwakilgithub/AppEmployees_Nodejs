const mongoose = require("mongoose");
const employees = require("./routes/employees");
const departments = require("./routes/departments");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/employees")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/employees", employees);
app.use("/api/departments", departments);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
