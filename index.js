require("dotenv").config();
const inquirer = require("inquirer");
const pg = require("pg");

const { Pool } = pg;
const pool = new Pool({
  user: process.env.username,
  password: process.env.password,
  host: "localhost",
  database: process.env.db,
});

pool.connect();

// const art = require("npm ASCII art maker");

// uses inquirer to make the menu a function
const tracker = function () {
  inquirer
    .prompt([
      {
        name: "Menu",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Roles",
          "View All Departments",
          "Add Employee",
          "Update Employee Role",
          "Add Role",
          "Add Department",
        ],
      },
    ])
    .then((answer) => {
      console.log(answer);
      userChoice(answer.Menu);
    });
  function userChoice(answer) {
    if (answer === "View All Employees") {
      viewAllEmployees();
    } else if (answer === "View All Roles") {
      viewAllRoles();
    } else if (answer === "View All Departments") {
      viewAllDepartments();
    } else if (answer === "Add Employee") {
      addEmployee();
    } else if (answer === "Update Employee Role") {
      updateEmployee();
    } else if (answer === "Add Role") {
      addRole();
    } else if (answer === "Add Department") {
      addDepartment();
    }
  }
};

const viewAllEmployees = () => {
  console.log("viewAllEmployees");
  const sql = `SELECT id, employee_name AS name FROM employees`;

  pool.query(sql, (err, { rows }) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(rows);
  });

  tracker();
};
const viewAllRoles = () => {
  console.log("viewAllRoles");
  tracker();
};
const viewAllDepartments = () => {
  console.log("viewAllDepartments");
  tracker();
};
const addEmployee = () => {
  console.log("addEmployee");
  tracker();
};
const updateEmployee = () => {
  console.log("updateEmployee");
  tracker();
};
const addRole = () => {
  console.log("addRole");
  tracker();
};
const addDepartment = () => {
  console.log("addDepartment");
  tracker();
};

// use logo function to add my project name etc

// TODO: create queries as functions here
tracker();
