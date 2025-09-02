export class BankingSystem {
  constructor(initialBalance = 0) {
    this.balance = initialBalance
    this.transactionHistory = []
  }

  getBalance() {
    return this.balance
  }

  deposit(amount) {
    if (amount <= 0) {
      return false
    }
    
    this.balance += amount
    this.addToHistory('deposit', amount, true)
    return true
  }

  withdraw(amount) {
    if (amount <= 0) {
      return false
    }
    
    if (amount > this.balance) {
      this.addToHistory('withdraw', amount, false)
      return false
    }
    
    this.balance -= amount
    this.addToHistory('withdraw', amount, true)
    return true
  }

  addToHistory(type, amount, success) {
    this.transactionHistory.unshift({
      type,
      amount,
      success,
      timestamp: new Date(),
      balanceAfter: success ? this.balance : this.balance
    })
    
    // Keep only last 10 transactions
    if (this.transactionHistory.length > 10) {
      this.transactionHistory.pop()
    }
  }

  getTransactionHistory() {
    return this.transactionHistory
  }
}