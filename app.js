// Dates and times
var moment = require("moment");

// Prompt system
var inquirer = require("inquirer");

// Import the databse connection
var connection = require("./db/db.js");

// Generate FAKE CC numbers for new accounts 
var generator = require('creditcard-generator');

// Connect to db
connection.connect(function (err) {
    if (err) throw err;
});


var getInfo = function(){
    connection.query("SELECT * FROM card", function(error, res){
        if (error) throw error;
        console.table(res);
        
        // Restarts the app
        startApp();
    });
}

/*
Create a new credit card with a FAKE generated CC number
Credit limit is determined by the prompt
APR is always 35 (to be calculated to 35%)
Balance starts as 0
*/
var createCard = function (credLimit) {
    connection.query("INSERT INTO card SET card_number = " + generator.GenCC() + ", credit_limit = ?, APR = 35, balance = 0",
        [credLimit],
        function (err, res) {
            if (err) throw err;
            console.log("New Credit Card Created!");
            startApp();
        });
}


// Kick off the welcome screen and give initial prompts.
var startApp = function () {
    inquirer.prompt([
        {
            name: "welcomePrompt",
            type: "list",
            choices: ["Create an Account", "View Cards", "View Transactions", "Logout"],
            message: "What would you like to do?"
        }
    ]).then(function (answer) {
        switch (answer.welcomePrompt) {
            case "Create an Account":

                // Prompt for details to create account
                inquirer.prompt([
                    {
                        name: "credLimit",
                        type: "list",
                        choices: ["1,000", "5,000", "10,000"],
                        message: "Select a credit limit for this card"
                    }
                ]).then(function (ans) {
                    createCard(parseInt(ans.credLimit));
                    // Pass this to the createCard function parseInt(ans.credLimit)
                });
                break;

            case "View Cards":
                getInfo();
                break;

            case "View Transactions":
                console.log("View transactions");
                break;

            case "Logout":
                killApp();
        }
    })
}

// End db connection
var killApp = function () {
    connection.end();
    console.log("Goodbye!")
}





startApp();
// killApp();