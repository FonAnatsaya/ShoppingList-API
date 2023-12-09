const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const Employee = require('./models/employee');
const Product = require('./models/product');
const Occupation = require('./models/occupation');

const corsOptions = {
    origin: 'http://localhost:3001',
    methods: 'GET,POST,DELETE,PATCH',
    allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/appMallDemo', { useNewUrlParser: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!");
    })
    .catch((err) => {
        console.log("OH MONGO CONNECTION ERROR!!!!");
        console.log(err);
    })

// const isCEO = async (form) => {
//     await Employee.find({ position: 'CEO' })
//         .then((data) => {
//             if (!data || (form._id === data._id)) return res.json({ isCEO: false });
//             else {
//                 return res.json({ isCEO: true });
//             }
//         })
//         .catch((error) => {
//             console.error("OOP! There's an ERROR", error);
//         })
// }

app.get('/occupationList', (req, res) => {
    Occupation.find({})
        .then(occupationList => {
            res.send(occupationList);
        })
        .catch(error => {
            console.error('Error fetching employee list:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
})

app.get('/empList', (req, res) => {
    Employee.find({})
        .then(employeeList => {
            res.send(employeeList);
        })
        .catch(error => {
            console.error('Error fetching employee list:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
})

app.post('/api/employees', (req, res) => {
    const newEmpData = new Employee(req.body);

    newEmpData.save()
        .then((data) => {
            console.log("Employee added successfully");
            console.log(data);
            res.status(201).json({ message: 'Employee added successfully' });
        })
        .catch((_) => (res.status(500).json({ error: 'Error updating employee' })));
})

app.patch('/api/employees/:id', (req, res) => {
    const employeeId = req.params.id;
    const updatedEmployeeData = req.body;

    Employee.findByIdAndUpdate(employeeId, updatedEmployeeData)
        .then((data) => {
            if (!data) {
                return res.status(204).json({ error: 'Employee not found' });
            }
            res.status(200).json({ message: 'Employee updated successfully', employee: data });
        })
        .catch((_) => (res.status(500).json({ error: 'Error updating employee' })));
})

app.delete('/api/employees/:id', (req, res) => {
    const employeeId = req.params.id;
    Employee.findByIdAndRemove(employeeId)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ error: 'Employee not found' });
            }
            res.status(204).json({ message: 'Employee deleted successfully', employee: data });
        })
        .catch((error) => {
            console.error("Error deleting employee:", error);
            res.status(500).json({ error: 'Error deleting employee' });
        });
})

app.get('/pdList', async (req, res) => {
    const productList = await Product.find();
    res.send(productList);
})

app.post('/api/product', (req, res) => {
    const newProductData = req.body;
    const product = new Product(newProductData);

    product.save()
        .then((data) => {
            console.log("Product added successfully");
            console.log(data);
            res.status(201).json({ message: 'Product added successfully' });
        })
        .catch((err) => {
            console.log("OOP! There's an ERROR", err);
            res.status(500).json({ error: 'Failed to add product' });
        });
});

app.patch('/api/product/:id', (req, res) => {
    const productId = req.params.id;
    const updatedProductData = req.body;

    Product.findByIdAndUpdate(productId, updatedProductData)
        .then((data) => {
            if (!data) {
                return res.status(204).json({ error: 'Product not found' });
            }
            res.status(200).json({ message: 'Product updated successfully', product: data });
        })
        .catch((data) => (res.status(500).json({ error: 'Error updating product' })));
})

app.delete('/api/product/:id', (req, res) => {
    const productId = req.params.id;

    Product.findByIdAndRemove(productId)
        .then((data) => {
            if (!data) {
                res.status(404).json({ error: 'Product not found' });
            }
            res.status(204).json({ message: 'Product deleted successfully', product: data });
        })
        .catch((data) => (res.status(500).json({ error: 'Error deleting product' })));
})

app.listen(8080, () => {
    console.log("Listening on port 8080!!!");
})
//

// app.delete('/api/employees/:id', (req, res) => {
//     const employeeId = req.params.id;
//     const updatedEmp = employeeList.filter((emp) => (emp.id !== employeeId));

//     // Check if an employee was found and deleted
//     if (employeeList.length === updatedEmp.length) {
//         return res.status(404).json({ message: 'The employee not found!' });
//     }

//     // Update the employee's data
//     employeeList = updatedEmp;
//     res.status(204).json({ message: 'Employee updated successfully' });
// })

// app.get('/pdList', (req, res) => {
//     res.send(productList);
// })

// app.post('/api/product', (req, res) => {
//     const newProduct = { ...req.body, id: uuidv4() };
//     productList.push(newProduct);
//     res.status(201).json({ message: 'The product added successfully' });
// })

// app.patch('/api/product/:id', (req, res) => {
//     const productId = req.params.id;
//     const updatedProduct = req.body;
//     const productToUpdated = productList.find((pd) => (pd.id === productId));
//     if (!productToUpdated) {
//         return res.status(404).json({ message: 'The product not found' });
//     }
//     productToUpdated.name = updatedProduct.name;
//     productToUpdated.quantity = updatedProduct.quantity;
//     productToUpdated.price = updatedProduct.price;
//     res.status(200).json({ message: 'The product updated successfully' });
// })

// app.delete('/api/product/:id', (req, res) => {
//     const productId = req.params.id;
//     const updatedProduct = productList.filter((pd) => (pd.id !== productId));
//     if (updatedProduct.length === productList.length) {
//         return res.status(404).json({ message: 'The product not found' });
//     }
//     productList = updatedProduct;
//     res.status(204).json({ message: 'Product updated successfully' });
// })