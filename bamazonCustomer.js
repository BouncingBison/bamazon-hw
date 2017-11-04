var express = require('express');
var mysql = require('mysql');
var colors = require('colors');
var clear = require('clear');
var fs = require('fs');
var inquirer = require('inquirer');
var sequelize = require('sequelize');
var bodyParser = require('body-parser');
var cli_table = require('cli-table');
var beeper = require('beeper');
var cli_boxes = require('cli-boxes');
var figures = require('figures');
var chalk = require('chalk');
var util = require('util');

// creating our mySQL connection 
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'spice_rack_test'
});
// when we are connected the console will beep 4 times
connection.connect(function(err) {
    if (err) throw (err);

    // using * for beep and _ for pause you can set you own beep melody 
    beeper('*_*');

    lobby();
});
// END CONNECTION

function lobby() {
    console.log("lobby function")

    inquirer.prompt([{
        type: 'input',
        name: 'fork',
        message: 'Input A to see inventory, input B to skip to item selection'
    }]).then(function(input) {

        var forkSelection = input.fork;

        if (forkSelection === 'A') {
            inventory();
        } else {

            makeSelection();
        }
    });

};


function inventory() {
    // selecting all items from products table
    connection.query('SELECT * FROM products', function(err, res) {
        var spices = res;
        for (i = 0; i < res.length; i++) {
            console.log("\n----------------------------------------------------------------------------------------")
            console.log(res[i].id + ' Product Name: ' + res[i].spiceName + ' Price: ' + '$' + res[i].price + '(Quantity left: ' + res[i].stock + ')')
        }
        if (err) throw (err);

        return spices.id;

    });

    inquirer.prompt([{
        type: 'input',
        name: 'ready',
        message: 'Input \'ready\'to begin adding items to cart \n'
    }]).then(function(input) {

        var beginAddToCart = input.ready;

        if (beginAddToCart === 'ready') {
            makeSelection();
        } else {
            inventory();
        }
    });

};


function makeSelection() {

    inquirer.prompt([{
        type: 'checkbox',
        name: 'products',
        pageSize: (30),
        message: 'Welcome to the Spice Rack, your online spice emporium',
        choices: products,
        filter: function(val) {
            return val;
        }
    }]).then(function(val) {

        console.log(val.products);
        var arr = val.products;
        // console.log(arr);
        console.log("logging arr" + arr);
        var cart = [];
        // parseInt(arr)
        // function loader(arr, cart) {
        //     // for (i = 0; i < val.products.length; i++) {
        //     //     if (val.products) {
        //     //         var newItem = parseInt(val.products[i]);
        //     //         cart.forEach(function(newItem) {
        //     //             cart.push(newItem);
        //     //         });
        //     //     }

        //     // }
        // }

    });


    // connection.query("SELECT * FROM products", function(err, res, val) {
    //     for (i = 0; i < res.length; i++) {
    //         if (res[i].id === parseInt(val.products)) {
    //             var cart = [];
    //             cart.push(res[i].spiceName);
    //             cart.forEach(function(item, index, array) {
    //                 console.log(item, index);
    //             });
    //         }
    //     }
    //     return cart;
    //     console.log(cart.length);

    // });

}
// return itemsToCart;
// ["Apple", "Banana", "Orange"]

// purchase(val, itemsToCart);
// console.log("logging val.products: " + val.products);
// itemsToCart.forEach(function(item, index, array) {
//     console.log(item, index, array);
// });
// function pushToCart(arr) {
//     itemsToCart.push(val.products);
//     console.log("logging something" + val.products);
//     console.log();
// }
// console.log(arr[i]);
// connection.query('SELECT * FROM products', function(err, res, arr) {
//     var cartedItem = arr;
//     for (i = 0; i < cartedItem; i++) {
//         console.log(cartedItem[i]);
//     }
// });
// return itemsToCart;
// purchase();



// purchasing function 

// var purchase = function(val, cart) {

//     // bring in the val.products numbers 
//     console.log("logging val.products: " + val.products);
//     console.log(cart.length);
// }


// shipping 


var products = [
    { name: 'Curry', value: 1, },
    { name: 'White Pepper', value: 2, },
    { name: 'Pink Himalayan Salt', value: 3, },
    { name: '$affron', value: 4, },
    { name: 'Mesquite', value: 5, },
    { name: 'Garam Marsala', value: 6, },
    { name: 'Mustard Seed', value: 7, },
    { name: 'Cumin', value: 8, },
    { name: 'Coriander', value: 9, },
    { name: 'Chili-P', value: 10 }
]