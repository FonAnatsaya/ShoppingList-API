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

let employeeList = [
    { id: uuidv4(), name: "Johnny", position: "Junior Developer", salary: 25000 },
    { id: uuidv4(), name: "Linda", position: "IT Support", salary: 30000 },
    { id: uuidv4(), name: "Stephen", position: "Data Analyst", salary: 38000 },
    { id: uuidv4(), name: "Rainny", position: "CEO", salary: 500000 }
]

let productList = [
    { id: uuidv4(), name: "A1", quantity: "18", price: "5" },
    { id: uuidv4(), name: "A2", quantity: "20", price: "10" },
    { id: uuidv4(), name: "B1", quantity: "50", price: "8" }
]

app.get('/', (req, res) => {
    res.send('This is Home page!');
})

app.get('/empList', (req, res) => {
    res.send(employeeList);
})

app.post('/api/employees', (req, res) => {
    const newEmployee = { ...req.body, id: uuidv4() };
    employeeList.push(newEmployee);

    // Send a response back to the frontend
    res.status(201).json({ message: 'Employee added successfully' });
});

app.patch('/api/employees/:id', (req, res) => {
    const employeeId = req.params.id;
    const updatedEmployeeData = req.body;

    // Find the employee in my database based on employeeId
    const employeeToUpdate = employeeList.find((employee) => (employee.id === employeeId));

    if (!employeeToUpdate) {
        return res.status(404).json({ message: 'Employee not found' });
    }

    // Update the employee's data 
    employeeToUpdate.name = updatedEmployeeData.name;
    employeeToUpdate.position = updatedEmployeeData.position;
    employeeToUpdate.salary = updatedEmployeeData.salary;

    // Respond with a success message and the updated employee
    res.status(200).json({ message: 'Employee updated successfully', employee: employeeToUpdate });
});

app.delete('/api/employees/:id', (req, res) => {
    const employeeId = req.params.id;
    const updatedEmp = employeeList.filter((emp) => (emp.id !== employeeId));

    // Check if an employee was found and deleted
    if (employeeList.length === updatedEmp.length) {
        return res.status(404).json({ message: 'The employee not found!' });
    }

    // Update the employee's data
    employeeList = updatedEmp;
    res.status(204).json({ message: 'Employee updated successfully' });
})

app.get('/pdList', (req, res) => {
    res.send(productList);
})

app.post('/api/product', (req, res) => {
    const newProduct = { ...req.body, id: uuidv4() };
    productList.push(newProduct);
    res.status(201).json({ message: 'The product added successfully' });
})

app.delete('/api/product/:id', (req, res) => {
    const productId = req.params.id;
    const updatedProduct = productList.filter((pd) => (pd.id !== productId));
    if (!updatedProduct) {
        res.status(404).json({ message: 'The product not found' });
    }
    productList = updatedProduct;
    res.status(204).json({ message: 'Product updated successfully' });
})

app.listen(8080, () => {
    console.log("Listening on port 8080!!!");
})