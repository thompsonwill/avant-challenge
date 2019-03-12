// Prompt system
var inquirer = require("inquirer");

// Format our data into a table
var Table = require('cli-table');

// Import the databse connection
var connection = require("./db/db.js");

// Generate FAKE CC numbers for new accounts. 
var generator = require('creditcard-generator');

// Connect to db
connection.connect(function (err) {
    if (err) throw err;
});

// clears the console window, helps with readability 
var clear = function(){
    console.log('\033[2J');
}

// Create our table for the card infomation
var cardTable = new Table({
    head: ['id', 'card_number', 'credit_limit', 'APR', 'created_at', 'balance']
});

// Create our table for the transaction information
var transactionTable = new Table({
    head: ['transID', 'amount', 'ownerID', 'created_at']
});


// This function displays the table with card info and does NOT restart the app. For display only.
var showCards = function () {
    // Clear the window - it's easier on the eyes
    connection.query("SELECT * FROM card", function (error, res) {
        if (error) throw error;
        res.forEach(function (res) {
            cardTable.push(
                [res.id, res.card_number, res.credit_limit, res.APR, res.created_at, res.balance]
            );
        });

        console.log(cardTable.toString());
    });
}

// Converts input from the prompt to a dollar amount ready for the db
var inputToDollar = function (money) {
    var number = Number(money.replace(/[^0-9.-]+/g, ""));
    return number;
}

// This displays the card table AND restarts the application.
var viewCardsAndRestart = function () {
    console.log('\033[2J');
    connection.query("SELECT * FROM card", function (error, res) {
        if (error) throw error;

        // Use the cli-table to format the data
        res.forEach(function (res) {
            cardTable.push(
                [res.id, res.card_number, res.credit_limit, res.APR, res.created_at, res.balance]
            );
        });

        console.log(cardTable.toString());
        startApp();
    });
}

// Displays transactions for the card selected by ID
var getTransactions = function (cardID) {

    connection.query("SELECT * FROM transactions WHERE ownerID = ?",
        [cardID], function (error, res) {
            if (error) throw error;
            // Use the cli-table to format the data
            res.forEach(function (res) {
                transactionTable.push(
                    [res.transID, res.amount, res.ownerID, res.created_at]
                );
            });

            console.log(transactionTable.toString());
            startApp();
        });
}

// Consolidate the following two functions into one and validate for the operator

// After a purchase increase balance
var increaseBalance = function (cardID, purchaseAmt) {
    connection.query("UPDATE card SET balance = balance + ? WHERE id = ?",
        [purchaseAmt, cardID],
        function (err, res) {
            if (err) throw err;
            console.log("New Balance Recorded! Thank you for your purchase");
        });
}

// After a payment decrease balance
var decreaseBalance = function (cardID, purchaseAmt) {
    connection.query("UPDATE card SET balance = balance - ? WHERE id = ?",
        [purchaseAmt, cardID],
        function (err, res) {
            if (err) throw err;
            console.log("New Balance Recorded! Thank you for your payment");
        });
}


// Consolidate the following two functions, validate for input

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

// Let's make a payment
var makePayment = function (cardID, purchaseAmt) {
    connection.query("INSERT INTO transactions SET amount = ?, ownerID = ?",
        [purchaseAmt, cardID],
        function (err, res) {
            if (err) throw err;
            console.log("New Payment Recorded!");
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

var lastTransaction = function(ownerID){
    connection.query("SELECT created_at FROM transactions WHERE ownerID = ?",
        [ownerID], function (error, res) {
            if (error) throw error;

            res.forEach(function (res) {
                console.log("LAST TRANSACTION: " + res.created_at);
            });
            
        });
}

var getDifference = function(){
    console.log("Getting the time difference");

    
}

lastTransaction(2);

// Calculate Interest - 35% APR on all cards (based on the example given)
var calcInterest = function (balance, rate, days) {
    console.log("We're calculating interest");
    var interest = balance * (rate / 365) * 30;
    var parsedFloat = parseFloat(interest);
    var totalInt = (parsedFloat + balance);
    return totalInt;
}

// Testing with $500 balance, .35 APR and 30 days.
console.log(calcInterest(500, .35, 30));

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
                
                // Clear the window - it's easier on the eyes
                clear();
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
            // Clear the window - it's easier on the eyes
            clear();
                viewCardsAndRestart();
                
                break;


            case "Make a Purchase":

                // First show the cards to the user
                showCards();
                // Clear the window - it's easier on the eyes
                clear();

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
                    increaseBalance(ans.cardID, ans.purchaseAmt);

                    makePurchase(ans.cardID, inputToDollar(ans.purchaseAmt));
                });
                break;

            case "Make a Payment":
            // Clear the window - it's easier on the eyes
            clear();
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
                    decreaseBalance(ans.cardID, ans.purchaseAmt);

                    makePayment(ans.cardID, inputToDollar(ans.purchaseAmt));
                });
                break;


            case "View Transactions":
            // Clear the window - it's easier on the eyes
            clear();

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
            // Clear the window - it's easier on the eyes
            clear();
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