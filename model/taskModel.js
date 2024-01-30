const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    require: true
  }
});

const taskModel = mongoose.model("tasks", taskSchema);

module.exports = taskModel;
