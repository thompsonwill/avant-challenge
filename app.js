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


// This function displays the table with card info and does NOT restart the app. For display only.
var showCards = function(){
    connection.query("SELECT * FROM card", function(error, res){
        if (error) throw error;
        console.table(res);
    });
}

// This displays the card table AND restarts the application.
var viewCardsAndRestart = function(){
    connection.query("SELECT * FROM card", function(error, res){
        if (error) throw error;
        console.table(res);
        startApp();
    });
}

var getTransactions = function(cardID){
    console.log("This is the cardID: " + cardID);
}


/*
Create a new credit card with a FAKE generated CC number
Credit limit is determined by the prompt - 3 options $1k, $5k, $10k
APR is always 35 (35%)
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
                        choices: ["1000", "5000", "10000"],
                        message: "Select a credit limit for this card"
                    }
                ]).then(function (ans) {
                    createCard(parseInt(ans.credLimit));
                    // Pass this to the createCard function parseInt(ans.credLimit)
                });
                break;

                // Display all information for available cards
            case "View Cards":
                viewCardsAndRestart();
                break;

            case "View Transactions":
                console.log("View transactions");

                // First display the cards in a table so users know which card to select
                
                
                // Prompt users for which card to choose
                inquirer.prompt([
                    {
                        name: "cardID",
                        type: "input",
                        message: "\nEnter the ID for the card you would like inspect: \n \n"
                    }
                ]).then(function(ans){
                    console.log(ans.cardID);
                });

                showCards();

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