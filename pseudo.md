## Interest is calculated daily, starting the day after the account is opened, at the close of each day.

## Calculated interest becomes due at the close every 30 days after the account has been opened.



# Main Functionality

    # Create a new account (open credit card)

    DB STRUCTURE
        - Owner (name - first & last)
        - Credit Limit
        - APR (Calculated daily but due every 30 days after opening)
        - Date opened
        - Payments (Date made, amount)
        - Charges (Date made, amount)
        - Balance (outstanding and adds interest)

    # Keep track of charges (swipes)
    # Keep track of payments
    # Provide total outstanding balance on each day