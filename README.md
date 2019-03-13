# Technologies USed
   Javascript/Node JS,
   mySQL,
   momentJS,
   Inquirer,

# Details
   I am currently on the instructional team for Northwestern University's Full-Stack bootcamp. Over the past week our students have been working with node JS and mySQL. I chose these technologies due to my immediate familiarity. The applicaction can create an account, keep track of charges, keep track of payments, and provide the total outstanding balance on any given day. 

   Create a card, make some payments and charges and use the Fast Forward functionality to simulate interest over time.

   ![main window](/img/main.PNG)

# schema.sql
   The database structure I created for this challenge. Once it is set up, the creation and data manipulation can be done in the application.

# "Create an Account"
   Generates a credit card and lets users choose credit limit (next version will have validation to ensure charges do not surpass credit limit). These cards are capable of purchases, payments, and interest calculations


# "View Cards"
   Displays accounts in the database in a table with the table heads: id, card_number, credit_limit, APR, created_at, balance. If selected more than once, duplicate cards can show.

   ![view cards](/img/view-cards.PNG)

# "Make a Purchase"
   Prompts users to choose which card (by ID) they would like to make a purchase on. Second prompt asks for the purchase amount.

   ![make a purchase](/img/purchase.PNG)

# "Make a Payment"
    Prompts users to choose which card (by ID) they would like to make a payment on. Second prompt asks for the payment amount.

![make a payment](/img/payment.PNG)

# "View Transactions"
   Displays a table of all available cards. Prompts users to select which card they would like to see a detailed view of transactions.

   ![see transactions](/img/transactions.PNG)

# "Fast Forward, Calculate Interest"
   Once a card is created, you can simulate interest calculations after 'x' amount of days have passed. The examples provided on the original instructions can be applied.

# "Logout"
   Clears the window and returns you to your console

