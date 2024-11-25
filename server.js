import inquirer from "inquirer";

const PORT = process.env.PORT || 3001;

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Create an employee
app.post("/api/new-employee", ({ body }, res) => {
  const sql = `INSERT INTO employees (employee_name)
    VALUES ($1)`;
  const params = [body.employee_name];

  pool.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: body,
    });
  });
});

// Read all employees
app.get("/api/employees", (req, res) => {
  const sql = `SELECT id, employee_name AS name FROM employees`;

  pool.query(sql, (err, { rows }) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Delete an employee
app.delete("/api/employee/:id", (req, res) => {
  const sql = `DELETE FROM employees WHERE id = $1`;
  const params = [req.params.id];

  pool.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: err.message });
    } else if (!result.rowCount) {
      res.json({
        message: "Employee not found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.rowCount,
        id: req.params.id,
      });
    }
  });
});

// Read list of all roles and associated employee name using LEFT JOIN
app.get("/api/employee-reviews", (req, res) => {
  const sql = `SELECT employees.employee_name AS employee, roles.role FROM roles LEFT JOIN employees ON roles.employee_id = employees.id ORDER BY employees.employee_name;`;
  pool.query(sql, (err, { rows }) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Update role
app.put("/api/role/:id", (req, res) => {
  const sql = `UPDATE roles SET role = $1 WHERE id = $2`;
  const params = [req.body.role, req.params.id];

  pool.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.rowCount) {
      res.json({
        message: "Role not found",
      });
    } else {
      res.json({
        message: "success",
        data: req.body,
        changes: result.rowCount,
      });
    }
  });
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
