const adminModel = require("../model/adminModel");
const taskModel = require('../model/taskModel')
const cookies = require("cookies");
const bcrypt = require("bcrypt");

const defaultRoute = async (req, res) => {
  const logIn = req.cookies;

  if (logIn.uid) {
    try {
      const tasks = await taskModel.find();
      let uid = req.cookies.uid
      res.render("index", {tasks, uid});
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/login");
  }
};

const login = (req, res) => {
  res.render("page-login");
};

const register = (req, res) => {
  res.render("page-register");
};

const creatUser = async (req, res) => {
  const { name, email, password, conf_password } = req.body;
  const admin_data = await adminModel.findOne({ email });
  
  

  console.log("admin_data_email....", admin_data);

  if (password == conf_password && admin_data == null) {
    try {
      let soultRoute = 10;
      let enPass = await bcrypt.hash(password, soultRoute);

      const user = new adminModel({
        name,
        email,
        password: enPass,
      });
      user.save();

      res.redirect("/login");
    } catch (err) {
      console.log("er", err);
    }
  } else {
    res.redirect("/register");
  }
};

const userLogin = async (req, res) => {
  try {
    var users = await adminModel.find();

    const user = users.filter((user) => {
      return user.email == req.body.userEmail;
    });

    if (user.length == 0) {
      console.log("create account...");
      res.redirect("/register");
    } else {
      console.log(req.body.pass);
      let dPass = await bcrypt.compare(req.body.userPassword, user[0].password);

      console.log("Pass", dPass);

      if (dPass) {
        console.log("login success fully....");
        // us_id = user[0].id;

        res.cookie("uid", user[0].id, { httpOnly: true });
        res.redirect("/");
      } else {
        console.log("wrong password...");
      }
    }
    res.redirect("/login");
  } catch (err) {
    console.log(err);
  }
};

const logOut = (req, res) => {
  res.clearCookie("uid");

  res.redirect('/')
}

const task = async (req, res) => {
  try {
    const tasks = await taskModel.find();
    const uid = req.cookies.uid
    res.render("task", { tasks, uid });
  } catch (err) {
    console.log(err);
  }
};

const addTaskPage = (req, res) => {
  res.render("add-Task");
};

const addTask = (req, res) => {
  try {
    const {date, title, description, status} = req.body;

    let addTask = new taskModel({
      date,
      title,
      description,
      status,
      userId: req.cookies.uid
    });

    addTask.save();
    res.redirect("/showTask");
  } catch (err) {
    console.log(err);
  }
};

const showTask = async (req, res) => {
  res.redirect("/");
};


const singleTask =async (req, res) => {
  console.log('ok', req.params.id);

  let task = await taskModel.findById(req.params.id)

  res.render('task', {task})
}

const editTask = async (req, res) => {
  let task = await taskModel.findById(req.params.id);
  res.render("editTask", { task });
};


const updateTask= async (req, res) => {
  const { id, title, description, status, date } = req.body;

  try {

    let updateTask = await taskModel.findByIdAndUpdate(id, {
      title,
      description,
      status,
      date
    });
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};


const deleteTask = async (req, res) => {
  try {
    let deleteTask = await taskModel.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

const allTask =async (req, res) => {
  const {uid} = req.cookies;

  let tasks = await taskModel.find();

  res.render('allTask', {tasks, uid})
}

module.exports = { defaultRoute, login, register, creatUser, userLogin, logOut, task, addTaskPage, addTask, showTask, singleTask, editTask, updateTask, deleteTask, allTask,  };
