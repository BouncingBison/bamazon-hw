module.exports = function(sequelize, DataTypes) {
    var Product = sequelize.define("Product", {
        // first name 
        item_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // last name
        product_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        department_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

    });
    return Product;
};