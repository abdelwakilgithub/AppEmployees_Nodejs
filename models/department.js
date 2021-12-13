const Joi = require("joi");
const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  Parent_department: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        maxlength: 50,
      },
    }),
  },
});

const Department = mongoose.model("Department", departmentSchema);

function validateDepartment(department) {
  const schema = {
    name: Joi.string().max(50).required(),
    parentDepartmentId: Joi.string()
  };

  return Joi.validate(department, schema);
}

exports.departmentSchema = departmentSchema;
exports.Department = Department;
exports.validate = validateDepartment;
