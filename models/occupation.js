const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/appMallDemo', { useNewUrlParser: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!");
    })
    .catch((err) => {
        console.log("OH MONGO CONNECTION ERROR!!!!");
        console.log(err);
    })

const occupationSchema = new mongoose.Schema({
    key: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Occupation = mongoose.model('Occupation', occupationSchema);

// Occupation.insertMany([
//     { key: 1000, description: 'Junior full stack developer' },
//     { key: 1200, description: 'Junior front-end developer' },
//     { key: 1300, description: 'Junior back-end developer' },
//     { key: 1400, description: 'Automatic Tester' },
//     { key: 1500, description: 'Cloud opera' }
// ])
//     .then((data) => {
//         console.log("It worked");
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log("OOP! There's an ERROR", err);
//     })

module.exports = Occupation;