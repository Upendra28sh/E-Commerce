const mongoose = require('mongoose');
const Product = require('./models/product');
const Seller = require('./models/seller');

data = [
    {
        name: 'Seller 1',
        image: 'seller1.jpg',
        about: 'This is seller number 1'
    },
    {
        name: 'Seller 2',
        image: 'seller2.jpg',
        about: 'This is seller number 2'
    }
];

function seedDB() {
    Product.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Removed all products");
        }
    });

    Seller.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Removed all sellers');
            data.forEach(function (seller) {
                Seller.create(seller, function (err, createdSeller) {
                    if (err) {
                        console.log(err);
                    }
                });
            });
        }
    });
}

module.exports = seedDB;