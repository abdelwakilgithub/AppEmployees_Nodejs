const { Employee, validate } = require("../models/employee");
const { Department } = require("../models/department");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const employees = await Employee.find().sort("first_name");
  res.send(employees);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const department = req.body.departmentId
    ? await Department.findById(req.body.departmentId).select("name")
    : undefined;
  if (!department && req.body.departmentId)
    return res.status(400).send("Invalid department.");

  const manager = req.body.managerId
    ? await Employee.findById(req.body.managerId).select("first_name last_name")
    : undefined;
  if (!manager && req.body.managerId)
    return res.status(400).send("Invalid manager.");

  let employee = new Employee({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    birth_date: req.body.birth_date,
    phone: req.body.phone,
    department: department,
    manager: manager,
  });
  employee = await employee.save();

  res.send(employee);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const department = req.body.departmentId
    ? await Department.findById(req.body.departmentId).select("name")
    : undefined;
  if (!department && req.body.departmentId)
    return res.status(400).send("Invalid department.");

  const manager = req.body.managerId
    ? await Employee.findById(req.body.managerId).select("first_name last_name")
    : undefined;
  if (!manager && req.body.managerId)
    return res.status(400).send("Invalid manager.");

  const employee = await Employee.findByIdAndUpdate(
    req.params.id,
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      birth_date: req.body.birth_date,
      phone: req.body.phone,
      department: department,
      manager: manager,
    },
    { new: true }
  );

  if (!employee)
    return res
      .status(404)
      .send("The employee with the given ID was not found.");

  res.send(employee);
});

router.delete("/:id", async (req, res) => {
  const employee = await Employee.findByIdAndRemove(req.params.id);

  if (!employee)
    return res
      .status(404)
      .send("The employee with the given ID was not found.");

  res.send(employee);
});

router.get("/:id", async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee)
    return res
      .status(404)
      .send("The employee with the given ID was not found.");

  res.send(employee);
});

module.exports = router;
