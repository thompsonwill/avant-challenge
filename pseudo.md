## Interest is calculated daily, starting the day after the account is opened, at the close of each day.

## Calculated interest becomes due at the close every 30 days after the account has been opened.



# Main Functionality

    # Create a new account (open credit card)
        

    DB STRUCTURE - Card
        - ID
        - Card Number (Foreign key to Owner Table)
        - Credit limit
        - APR (Calculated daily but due every 30 days after opening)
        - Balance (outstanding and adds interest)
        - Payments (amount, timestamp)
        - Charges (amount, timestamp)

    Calculate the amount of days between first and next charges/payments

    # Keep track of charges (swipes)
        - Select an account
        - PROMPT: Would you like to:
            * Make a payment - subtract amount from balance, adjust APR equation
            * Make a purchase - Add amount to balance, adjust APR

    # Provide total outstanding balance on any given day

    # Create function that calculates interest also take any payments or additional charges made (when you check the balance, see if the % modulous of the total days open is 0 when you divide 30) 

## Insert users into the database with historical data to showcase functionality.