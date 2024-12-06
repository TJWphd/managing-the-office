drop database if exists manager;
create database manager;
\c manager

--tables model the org structure of the office--
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR (31) UNIQUE NOT NULL
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR (31) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR (31) NOT NULL,
    last_name VARCHAR (31) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
        --foreign key for role id-
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
        --foreign key for manager_id back to this--
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);