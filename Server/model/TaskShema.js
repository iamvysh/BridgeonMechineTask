
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  color: {
    type: String,
        enum : ['green',"orange",'red'],
        default: 'red',    
  },


  

},{timestamps:true});

const task = mongoose.model("task", taskSchema);

module.exports = task;
