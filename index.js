const express = require("express");
const app = express();
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE,PATCH',
    allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));
app.use(express.json());

const employeeList = [
    { id: uuidv4(), name: "Johnny", position: "Junior Developer", salary: "25,000" },
    { id: uuidv4(), name: "Linda", position: "IT Support", salary: "30,000" },
    { id: uuidv4(), name: "Stephen", position: "Data Analyst", salary: "38,000" },
    { id: uuidv4(), name: "Rainny", position: "CEO", salary: "500,000" }
]

app.get('/r/:subreddit', (req, res) => { //Defining a generic path.
    //const { subreddit } = req.params; //Deconstructor object req.params
    //res.send(`<h1>Browsing the ${subreddit} subreddit</h1>`);
    res.send(`<h1>Browsing the ${req.params.subreddit} subreddit</h1>`); // 
})

app.get('/r/:subreddit/:postId', (req, res) => { //Defining a generic path.
    const { subreddit, postId } = req.params;
    res.send(`<h1>Viewing Post ID: ${postId} on the ${subreddit} subreddit</h1>`);
})

app.get('/empList', (req, res) => {
    res.send(employeeList);
})

app.post('/api/employees', (req, res) => {
    const newEmployee = { ...req.body, id: uuidv4() };
    // { id: uuidv4(), name: "Rainny", position: "CEO", salary: "500,000" }
    // Save the new employee to my database
    // Replace this with my database logic
    console.log(newEmployee);
    employeeList.push(newEmployee);

    // Send a response back to the frontend
    res.status(201).json({ message: 'Employee added successfully' });
});

app.patch('/api/employees/:id', (req, res) => {
    const employeeId = req.params.id;
    const updatedEmployeeData = req.body;

    // Find the employee in my database based on employeeId
    const employeeToUpdate = employeeList.find((employee) => employee.id === employeeId);

    if (!employeeToUpdate) {
        return res.status(404).json({ message: 'Employee not found' });
    }

    // Update the employee's data (replace with my actual update logic)
    employeeToUpdate.name = updatedEmployeeData.name;
    employeeToUpdate.position = updatedEmployeeData.position;
    employeeToUpdate.salary = updatedEmployeeData.salary;

    // Respond with a success message and the updated employee
    res.status(200).json({ message: 'Employee updated successfully', employee: employeeToUpdate });
});

app.listen(8080, () => {
    console.log("Listening on port 8080!!!");
})