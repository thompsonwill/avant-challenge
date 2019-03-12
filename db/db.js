// mySQL
var mysql = require("mysql");

// Configure the connection to mysql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "avant"
});

// Export the database connection.
module.exports = connection;
