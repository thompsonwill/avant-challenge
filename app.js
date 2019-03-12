// Dates and times
var moment = require("moment");

// Prompt system
var inquirer = require("inquirer");

// Import the databse connection
var connection = require("./db/db.js");

// Connect to db
connection.connect(function(err) {
    if (err) throw err;
});


// var getInfo = function(){
//     connection.query("SELECT * FROM card", function(error, res){
//         if (error) throw error;
//         console.table(res);
//     });
// }

// Kick off the welcome screen and give initial prompts.
var startApp = function(){
    inquirer.prompt([
        {
            name: "welcomePrompt",
            type: "list",
            choices: ["Create an account", "View Transactions","Logout"],
            message: "What would you like to do?"
        }
    ]).then(function(answer){
        switch(answer.welcomePrompt){
            case "Create an account":
                console.log("Create an account");
                break;
            case "View Transactions":
                console.log("View transactions");
                break;
            case "Logout":
                console.log("Goodbye!");
                connection.end();
        }
    })
}

// End db connection
var killApp = function(){
    connection.end();
    console.log("See ya!")
}


// Create a new credit card
var createCard = function(){
    console.log("Create card function");

}


startApp();
// killApp();