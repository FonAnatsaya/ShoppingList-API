const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/appMallDemo', { useNewUrlParser: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!");
    })
    .catch((err) => {
        console.log("OH MONGO CONNECTION ERROR!!!!");
        console.log(err);
    })

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;

// Employee.insertMany([
//     { name: "Johnny", position: "Junior Developer", salary: 25000 },
//     { name: "Linda", position: "IT Support", salary: 30000 },
//     { name: "Stephen", position: "Data Analyst", salary: 38000 },
//     { name: "Rainny", position: "CEO", salary: 500000 }
// ])
//     .then((data) => {
//         console.log("It worked");
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log("OOP! There's an ERROR", err);
//     })

