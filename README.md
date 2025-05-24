
# Banking System (C++)

A simple console-based banking system built in C++ that allows users to perform basic operations like checking balance, depositing funds, and withdrawing money. This project is ideal for beginners who want to practice control structures, functions, and input validation in C++.

## Features

- Display current account balance
- Deposit money
- Withdraw money with balance check
- Input validation to prevent invalid actions
- User-friendly menu system
- Clean and readable code with basic error handling

## Code Highlights

- Uses `functions` for modularity: `showbalance`, `deposit`, `withdraw`
- `iomanip` used for formatting output (2 decimal precision)
- Input validation using `cin.fail()` and `cin.clear()`
- Easy to extend with additional features like PIN check, transaction history, etc.

## How It Works

1. The program starts with a fixed balance of `4563.00`.
2. The user is shown a menu with 4 options:
    - Show Balance
    - Deposit Money
    - Withdraw Money
    - Exit
3. Based on the user's input, the corresponding function is executed.
4. Loop continues until the user selects "Exit".

