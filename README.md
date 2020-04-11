> This project is a work in progress and is not ready for use. If you are interested in contributing open an issue and let me know.

# Income & Expense

**A program for categorizing and reporting on banking data.**

- Categorizes each transaction in two levels.
- Creates report of spending by category.
- Shows spending by month (future)
- UI for categorizing transactions (done)
- UI to explore data by filtering & sorting (sorting done, filtering pending)

## Necessary Understanding

In this program
1. Any money you spend is a debit & must be a (-) number.
2. Any money you receive is a credit & must be a (+) number
3. Any money that is transferred between accounts should be omitted

The below will elaborate on this rules and explain how to conform to them when using Income & Expense.

### Debits & Credits

Different banking institutions and account types list debits and credits differently. Let's look at a couple of examples.

#### Ex 1 - Signle Amount Column

The below is an example of a checking account ledger.

| Description         | Amount  |
|---------------------|---------|
| Gasoline            |  -40.34 |
| Gym                 |  -44.99 |
| Grocery             | -114.95 |
| Credit Card Payment |   50.00 |
| Pay check           |1,500.00 |
| Return-refund       |   95.00 |

The table above has a single column, 'Amount', for both credits and debits. Debits are money you spent such as buying gasoline and are (-) numbers. Credits are money you receive such as 'Pay check' and are (+) numbers.

There is one exception, 'Credit Card Payment'. This is a transfer from one account to another. It will show on the credit card statement as well. It is neither money you receive nor money you spent as the actual expenditures are the individual purchase transaction which will show on the credit card ledger. It must be omitted from you Income & Expense records. How to do so will be explained below.

In summary, for this account:
- Debits and credits are in the same Amount column.
- (+) numbers are credits - money you receive
- (-) numbers are debits - money you spent
- Transfers between your accounts such as Credit Card Payment are neither money received nor spent and must be omitted.

#### Ex 2 - Separate Debit & Credit columns

This example comes from a credit card ledger.

| Description          | Debit | Credit |
|----------------------|-------|--------|
| DUNKIN DONUTS        | 2.58  |        |
| SOME HOSTING SERVICE | 4.53  |        |
| COSTCO RETURN        |       | -21.84 |
| GROCERY              | 2.17  |        |
| PAYMENT              |       | -50.00 |
| GASOLINE             | 38.12 |        |

In the table above debits are still money you spent and credits are money you receive. However, the debits are (-) numbers and credits are (+) numbers. This makes sense from the credit card companies perspective. However, from your perspective, debits must be (-) numbers and credits must be (+) numbers. Income & Expense has a way of correcting this which will be explained in a later section.

Let's look at some of the data.
- DUNKIN DONUTS is an expense so it needs to be a (-) number.
- COSTCO RETURN is income, you are receiving this money and it needs to be a (+) number.
- PAYMENT is a transfer from another of your accounts and needs to be omitted.




## How it works (in brief)

Currently can only be used by geeks. But then, you are looking at GitHub so you are a geek.

- Download transaction data from bank (e.g., checking, savings, credit card) in CSV format.
- Add config data to MongoDB to map required fields to column in CSV file.
  - Each institution and sometimes different account types within the same institution have different columns order, column names or no column names.

```json
{
    "_id" : ObjectId("5e46eef3626be23800bbb040"),
    "acctId" : "[name].[institutionName].[accountType].[accountNumLast4]",
    "dataFile" : {
        "name" : "[name].[institutionName].[accountType].[accountNumLast4].csv"
    },
    "fieldToCol" : {
        "date" : {
            "col" : 2
        },
        "description" : {
            "col" : 3
        },
        "debit" : {
            "col" : 4,
            "parse" : "<0"
        },
        "credit" : {
            "col" : 4,
            "parse" : ">0"
        },
        "typeOrig" : {
            "col" : 5
        },
        "checkNumber" : {
            "col" : 7
        }
    }
}
```

- Add config data to MongodB to categorize transactions.

E.g., The description field is 'ATM CHECK DEPOSIT Your Town NM PID: 123456' and the' Your Town NM PID: 123456' part of the string is not needed. The town and PID number will vary. The below looks in the 'description' field for a string that begins with 'ATM CHECK DEPOSIT', replaces it with 'ATM CHECK DEPOSIT' and categorizes it as income / my-job.

```json
{
    "_id" : ObjectId("5e45ca2f6d8f4438b8ee5930"),
    "acct" : "[name].[institutionName].[accountType].[accountNumLast4]",
    "criteria" : [
        {
            "field" : "description",
            "operation" : "beginsWith",
            "value" : "ATM CHECK DEPOSIT"
        }
    ],
    "actions" : [
        {
            "action" : "replaceAll",
            "field" : "description",
            "replaceWithValue" : "ATM CHECK DEPOSIT"
        },
        {
            "action" : "categorize",
            "category1" : "income",
            "category2" : "my-job"
        }
    ]
}
```

More detail to come.

## Motivation

I tried Quicken and Microsoft Money years ago. I had problems with data duplication and being unable to recategorize data. This was a long time ago so they may be better now. As a result, each year, to prepare for taxes, I spend days working with data in Excel typing until my fingers are sore. This project gives me a reusable process.

Additionally:
- I don't want to share my data with 3rd parties.
- I don't need another monthly subscription. They tend to add-up.

If you are interested in this project open an issue labeled 'question'.
