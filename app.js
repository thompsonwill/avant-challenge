// Prompt system
var inquirer = require("inquirer");

// Import the databse connection
var connection = require("./db/db.js");

// Generate FAKE CC numbers for new accounts. 
var generator = require('creditcard-generator');

// Connect to db
connection.connect(function (err) {
    if (err) throw err;
});


// This function displays the table with card info and does NOT restart the app. For display only.
var showCards = function () {
    connection.query("SELECT * FROM card", function (error, res) {
        if (error) throw error;
        console.table(res);
    });
}

// Converts input from the prompt to a dollar amount ready for the db
var inputToDollar = function (money) {
    var number = Number(money.replace(/[^0-9.-]+/g, ""));
    return number;
}

// This displays the card table AND restarts the application.
var viewCardsAndRestart = function () {
    connection.query("SELECT * FROM card", function (error, res) {
        if (error) throw error;
        console.table(res);
        startApp();
    });
}

// Displays transactions for the card selected by ID
var getTransactions = function (cardID) {
    connection.query("SELECT * FROM transactions WHERE ownerID = ?",
        [cardID], function (error, res) {
            if (error) throw error;
            console.table(res);
            startApp();
        });
}


// Send the new balance of the card to the database. Takes the current balance and adds the new value of the purchase
var updateBalance = function (cardID, purchaseAmt) {
    connection.query("UPDATE card SET balance = balance + ? WHERE id = ?",
    [purchaseAmt, cardID],
    function (err, res) {
        if (err) throw err;
        console.log("New Balance Recorded!");
    });
}


// Let's make a purchase
var makePurchase = function (cardID, purchaseAmt) {
    connection.query("INSERT INTO transactions SET amount = ?, ownerID = ?",
        [purchaseAmt, cardID],
        function (err, res) {
            if (err) throw err;
            console.log("New Purchase Recorded!");
            startApp();
        });
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
            choices: ["Create an Account", "View Cards", "Make a Purchase", "Make a Payment", "View Transactions", "Logout"],
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
                    // Pass this to the createCard function parseInt(ans.credLimit)
                    createCard(parseInt(ans.credLimit));
                });
                break;

            // Display all information for available cards
            case "View Cards":
                viewCardsAndRestart();
                break;


            case "Make a Purchase":

                // First show the cards to the user
                showCards();

                // Prompt users for which card to choose
                inquirer.prompt([
                    {
                        name: "cardID",
                        type: "input",
                        // If only buying something was this easy
                        message: "\nEnter the ID for the card you would like to make a purchase with: \n \n"
                    },
                    {
                        name: "purchaseAmt",
                        type: "input",
                        message: "How big of a purchase do you want to make? Enter a dollar amount: "
                    }
                ]).then(function (ans) {

                    // Update the new balance (not the shoes)
                   updateBalance(ans.cardID, ans.purchaseAmt);

                    makePurchase(ans.cardID, inputToDollar(ans.purchaseAmt));
                });
                break;

            case "Make a Payment":
                console.log("Make a Payment");
                break;


            case "View Transactions":

                // First show the cards to the user
                showCards();

                // Prompt users for which card to choose
                inquirer.prompt([
                    {
                        name: "cardID",
                        type: "input",
                        message: "\nEnter the ID for the card you would like inspect: \n \n"
                    }
                ]).then(function (ans) {
                    console.log(ans.cardID);
                    getTransactions(ans.cardID);
                });

                break;

            case "Logout":
                killApp();
        }
    })
}

// End db connection
var killApp = function () {
    connection.end();
    console.log("Goodbye!");
}




startApp();
// killApp();