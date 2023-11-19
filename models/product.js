const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/appMallDemo', { useNewUrlParser: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!");
    })
    .catch((err) => {
        console.log("OH MONGO CONNECTION ERROR!!!!");
        console.log(err);
    })

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

// Product.insertMany([
//     { name: "A1", quantity: "18", price: "5" },
//     { name: "A2", quantity: "20", price: "10" },
//     { name: "B1", quantity: "50", price: "8" }
// ])
//     .then((data) => {
//         console.log("It worked");
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log("OOP! There's an ERROR", err);
//     })

module.exports = Product;