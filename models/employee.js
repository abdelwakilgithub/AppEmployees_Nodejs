const Joi = require("joi");
const mongoose = require("mongoose");
const { departmentSchema } = require("./department");

const Employee = mongoose.model(
  "Employee",
  new mongoose.Schema({
    first_name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    last_name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    birth_date: {
      type: Date,
    },
    phone: {
      type: String,
      minlength: 5,
      maxlength: 50,
    },
    manager: {
      type: new mongoose.Schema({
        first_name: {
          type: String,
          required: true,
          maxlength: 50,
        },
        last_name: {
          type: String,
          required: true,
          maxlength: 50,
        },
      }),
    },

    department: {
      type: departmentSchema,
    },
  })
);

function validateEmployee(employee) {
  const schema = {
    first_name: Joi.string().max(50).required(),
    last_name: Joi.string().max(50).required(),
    email: Joi.string().max(50).required().email(),
    birth_date: Joi.string(),
    phone: Joi.string().min(5).max(50),
    departmentId: Joi.string(),
    managerId: Joi.string(),
  };

  return Joi.validate(employee, schema);
}

exports.Employee = Employee;
exports.validate = validateEmployee;
