## Thanks for applying to Avant's Intern/New Grad Program for Software Engineers. Now, let the fun begin!

## By the looks of your resume, we think you would be a great candidate for the program. As mentioned in the job posting, as much as we would like to jump on the phone with every single applicant, we simply don't have the time.

## So, as next steps, we would like you to submit the challenge below through a zip file within 3 days of receiving this e-mail. You can complete the challenge in any language and you do not need a UI. PLEASE BE SURE TO INCLUDE YOUR LAST NAME FIRST WHEN NAMING AND SAVING YOUR ZIP FILE.

## This will allow us to gauge where you are technically and help make a decision on next steps of your interview process (this is your "go big or go home" moment).

## Given a credit card that functions as follows: 
    Each card has an APR and Credit Limit.
    Interest is calculated daily, starting the day after the account is opened, at the close of each day.
    Calculated interest becomes due at the close every 30 days after the account has been opened.
    e.g., asking for the total outstanding balance 15, 28, or 29 days after opening will give the outstanding balance, but asking for balance 30 days after opening will give the outstanding balance plus the accrued interest.

## The software should be able to:
    X Create an account (e.g. opening a new credit card) X
    X Keep track of charges (e.g. card swipes) X
    X Keep track of payments X
    Provide the total outstanding balance as of any given day

## Test Scenario 1
    A customer opens a credit card with a $1,000.00 limit at a 35% APR.
    The customer charges $500 on opening day (outstanding balance becomes $500).
    The total outstanding balance owed 30 days after opening should be $514.38.
    500 * (0.35 / 365) * 30 = 14.38 

    balance * (.35 / 365) * 30

## Test Scenario 2 
    A customer opens a credit card with a $1,000.00 limit at a 35% APR.
    The customer charges $500 on opening day (outstanding balance becomes $500).
    15 days after opening, the customer pays $200 (outstanding balance becomes $300).
    25 days after opening, the customer charges another $100 (outstanding balance becomes $400).
    The total outstanding balance owed 30 days after opening should be $411.99.
    (500 * 0.35 / 365 * 15) + (300 * 0.35 / 365 * 10) + (400 * 0.35 / 365 * 5) = 11.99

    (balance * .35 / 365 * dayUntilPaymentOrCharge) 

Need to calculate interst between payments or purchases
