INSERT INTO department (name) VALUES
        ('Software'),
        ('Business'),
        ('Sales'),
        ('Facilities');

INSERT INTO role (title, salary, department_id) VALUES
        ('Project Manager', 289350, 1),
        ('Senior Engineer', 241113, 1),
        ('Accountant', 197331, 2),
        ('Social Media Advisor', 131234, 3),
        ('Custodian', 83497, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
        ('Tina', 'Smith', 1, NULL),
       ('John', 'Chang', 2, 1),
       ('Jose', 'Miller', 3, 1),
       ('Kareem', 'Reilly', 4, 1),
       ('Jenna', 'Yamaguchi', 5, NULL),
       ('Michael', 'Scott', 2, NULL);