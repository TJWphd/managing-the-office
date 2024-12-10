require("dotenv").config();
const { response } = require("express");
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

// let ascii_text_generator = require("ascii-text-generator");

// let input_text = "managing the office";

// console.log("output to file.js successfully.");
// execute callback
// ascii_text_generator();

// uses inquirer to make the menu a function
function tracker() {
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
}

const viewAllEmployees = () => {
  console.log("viewAllEmployees");
  const sql = `SELECT employee.id, first_name ||' '|| last_name AS name, role.title, manager_id FROM employee LEFT JOIN role ON employee.role_id = role.id`;

  pool.query(sql).then(({ rows }, err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(rows);
    tracker();
  });
};
const viewAllRoles = () => {
  console.log("viewAllRoles");
  const sql = `SELECT role.id, title, salary, department_id, department.name FROM role LEFT JOIN department ON role.department_id = department.id`;

  pool.query(sql).then(({ rows }, err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(rows);
    tracker();
  });
};

const viewAllDepartments = () => {
  console.log("viewAllDepartments");
  const sql = `SELECT department.name FROM department`;

  pool.query(sql).then(({ rows }, err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(rows);
    tracker();
  });
};

const addEmployee = () => {
  console.log("addEmployee");
  const sql = `SELECT id, first_name ||' '|| last_name AS name FROM employee WHERE manager_id IS NULL;`;

  pool.query(sql).then(({ rows }, err) => {
    if (err) {
      console.log(err);
      return;
    }
    const managerChoices = rows.map(({ id, name }) => {
      return { value: id, name: name };
    });
    const sql = `SELECT id, title FROM role`;

    pool.query(sql).then(({ rows }, err) => {
      if (err) {
        console.log(err);
        return;
      }
      const roleChoices = rows.map(({ id, title }) => {
        return { value: id, name: title };
      });
      inquirer
        .prompt([
          {
            name: "first_name",
            type: "input",
            message: "What employee first name would you like to create?",
          },
          {
            name: "last_name",
            type: "input",
            message: "What employee last name would you like to create?",
          },
          {
            name: "manager_id",
            type: "list",
            message: "What manager will you assign this employee under?",
            choices: managerChoices,
          },
          {
            name: "role_id",
            type: "list",
            message: "What role would you like to create?",
            choices: roleChoices,
          },
        ])
        .then((employeeName) => {
          const { first_name, last_name, role_id, manager_id } = employeeName;
          const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`;

          pool
            .query(sql, [first_name, last_name, role_id, manager_id])
            .then(({ rows }, err) => {
              if (err) {
                console.log(err);
                return;
              }
              console.log("Employee has been created.");
              tracker();
            });
        });
    });
  });
};

// TODO: LOOK UP SQL UPDATE COMMAND AND FIGURE OUT THE LOGIC -
// this will run a query to return all employees as choices,
// then run a query for all role ID and role Title, then the user selects what to update it to.

const updateEmployee = () => {
  // makes a string that is a SQL query
  const employeeList = `SELECT id, first_name, last_name FROM employee`;
  // calling a function pool.query and passing into it the string from above
  pool.query(employeeList).then(({ rows }, err) => {
    if (err) {
      console.log(err);
      return;
    }
    // cleaning and storing the array for use in a menu
    const employeeArray = rows.map(({ id, first_name, last_name }) => {
      return { value: id, name: `${first_name} ${last_name}` };
    });
    // ask the user which of these employees they want to edit
    inquirer
      .prompt([
        {
          name: "Menu",
          type: "list",
          message: "Which employee's role would you like to change?",
          choices: employeeArray,
        },
      ])
      .then((pick) => {
        const selectee = rows.filter((selectee) => {
          return selectee.id === pick.Menu;
        });
        console.log(selectee);
      });
  });
  tracker();
};

const addRole = () => {
  // console.log("addRole");
  // Title, Salary, Department_id
  const sql = `SELECT department.id, department.name FROM department`;

  pool.query(sql).then(({ rows }, err) => {
    if (err) {
      console.log(err);
      return;
    }
    // rows contains id and name
    const departmentChoices = rows.map(({ id, name }) => {
      return { value: id, name: name };
    });

    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the title of this role?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary of this role?",
        },
        {
          name: "department_id",
          type: "list",
          message: "What department does this role belong to?",
          choices: departmentChoices,
        },
      ])
      .then((response) => {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`;

        pool
          .query(sql, [response.title, response.salary, response.department_id])
          .then(({ rows }, err) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log(rows);
            tracker();
          });
      });
  });
};

const addDepartment = () => {
  console.log("addDepartment");
  inquirer
    .prompt({
      name: "departmentName",
      type: "input",
      message: "What department would you like to create?",
    })
    .then((departmentName) => {
      const sql = `INSERT INTO department (name) VALUES ($1)`;

      pool.query(sql, [departmentName.departmentName]).then(({ rows }, err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(rows);
        tracker();
      });
    });
};
tracker();
