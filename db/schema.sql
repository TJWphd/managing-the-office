--tables model the org structure of the office--
CREATE TABLE department (
    `id` SERIAL PRIMARY KEY,
    `name` VARCHAR (31) UNIQUE NOT NULL,
);

CREATE TABLE role (
    `id` SERIAL PRIMARY KEY,
    `title` VARCHAR (31) UNIQUE NOT NULL,
    `salary` DECIMAL NOT NULL,
    `department_id` INTEGER NOT NULL,
    -- foreign key for department id^-
);

CREATE TABLE employee (
    `id` SERIAL PRIMARY KEY,
    `first_name` VARCHAR (31) NOT NULL,
    `last_name` VARCHAR (31) NOT NULL,
        -- foreign key for role id^-
        -- foreign key for manager_id back to this_
);