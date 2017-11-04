var express = require('express');
var sql = require('mysql');
var colors = require('colors');
var clear = require('clear');
var fs = require('fs');
var inquirer = require('inquirer');
var sequelize = require('sequelize');
var bodyParser = require('body-parser');



// take inputs 

var productPrompt = {
    type: 'list',
    name: 'products list',
    message: 'Welcome to the Spice Rack, your online spice emporium',
    choices: [{

            name: 'Curry',
            value: 'curry'
        },
        {

            name: 'White Pepper',
            value: 'white-pepper'
        },

        {

            name: 'Pink Himalayan Salt',
            value: 'pink-himalayan-salt'
        },

        {

            name: '$affron',
            value: 'saffron'
        },

        {

            name: 'Mesquite',
            value: 'mesquite'
        },
        {

            name: 'Garam Marsala',
            value: 'garam-marsala'
        },
        {

            name: 'Mustard Seed',
            value: 'mustard-seed'
        },
        {

            name: 'Cumin',
            value: 'cumin'
        },
        {

            name: 'Coriander',
            value: 'coriander'
        },
        {

            name: 'Chili-P',
            value: 'chili-powder'
        }
    ]
};










// Run initial prompt.
mainPrompt();
// Initial question inquirer prompt.
function mainPrompt() {



    inquirer.prompt(productPrompt).then(secondSet);

}



// our express router 
var router = express.Router();

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 6069;


// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
// app.use(express.static(path.join(__dirname, '/views/')));
// app.use(express.static(path.join(__dirname, '/views/layouts/css')));



// Routes
// =============================================================
require("./models/products.js")(app);
var db = require('./models/products.js');

// index page 
// app.get('/products', function(req, res) {
//     db.Patient.findAll({
//         // need to do something in here to feed jquery? 
//         // or handlebars? 
//     }).then(function(dbPatients) {
//         // console.log(dbPatients);
//         console.log("server .get promise");
//         console.log(dbPatients);
//         res.render("patients", { patient_db: dbPatients });
//         next();
//     });
// });




app.get('/products', function(req, res) {

    db.Product.findAll({

    }).then(function(Product) {

        console.log(product.item_id);
        console.log("Product:" + product.product_name);
        console.log("category" + product.department_name);
        console.log("$" + product.price);
        console.log("Items in stock: " + product.stock);
    });

});

// Syncing our sequelize models and then starting our Express app
// // =============================================================
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});