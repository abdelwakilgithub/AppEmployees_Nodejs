const { Department, validate } = require("../models/department");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const departments = await Department.find().sort("first_name");
  res.send(departments);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const parentDepartment = req.body.parentDepartmentId
    ? await Department.findById(req.body.parentDepartmentId).select("name")
    : undefined;
  if (!parentDepartment && req.body.parentDepartmentId)
    return res.status(400).send("Invalid department.");

  let department = new Department({
    name: req.body.name,
    Parent_department: parentDepartment,
  });
  department = await department.save();

  res.send(department);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const parentDepartment = req.body.parentDepartmentId
    ? await Department.findById(req.body.parentDepartmentId).select("name")
    : undefined;
  if (!parentDepartment && req.body.parentDepartmentId)
    return res.status(400).send("Invalid department.");

  const department = await Department.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      Parent_department: parentDepartment,
    },
    { new: true }
  );

  if (!department)
    return res
      .status(404)
      .send("The department with the given ID was not found.");

  res.send(department);
});

router.delete("/:id", async (req, res) => {
  const department = await Department.findByIdAndRemove(req.params.id);

  if (!department)
    return res
      .status(404)
      .send("The department with the given ID was not found.");

  res.send(department);
});

router.get("/:id", async (req, res) => {
  const department = await Department.findById(req.params.id);

  if (!department)
    return res
      .status(404)
      .send("The department with the given ID was not found.");

  res.send(department);
});

module.exports = router;
