import './style.css'
import { BankingSystem } from './banking-system.js'

const app = document.querySelector('#app')

const bankingSystem = new BankingSystem(0.00)

app.innerHTML = `
  <div class="banking-container">
    <header class="bank-header">
      <div class="bank-logo">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 21h18"/>
          <path d="M5 21V7l8-4v18"/>
          <path d="M19 21V11l-6-4"/>
          <path d="M9 9v12"/>
          <path d="M15 9v12"/>
        </svg>
        <h1>SecureBank</h1>
      </div>
      <div class="account-info">
        <span class="account-number">Account: ****1234</span>
      </div>
    </header>

    <main class="banking-main">
      <div class="balance-card">
        <h2>Current Balance</h2>
        <div class="balance-amount" id="balance">$${bankingSystem.getBalance().toFixed(2)}</div>
        <div class="balance-subtitle">Available Balance</div>
        <div class="savings-goal">
          <div class="goal-progress">
            <div class="goal-bar">
              <div class="goal-fill" id="goalFill"></div>
            </div>
            <div class="goal-text">
              <span>Savings Goal: $<span id="goalAmount">1000</span></span>
              <span id="goalPercentage">0%</span>
            </div>
          </div>
        </div>
      </div>

      <div class="actions-grid">
        <div class="action-card deposit-card">
          <div class="action-icon deposit-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14"/>
              <path d="M5 12l7-7 7 7"/>
            </svg>
          </div>
          <h3>Deposit Money</h3>
          <div class="input-group">
            <input type="number" id="depositAmount" placeholder="Enter amount" min="0.01" step="0.01">
            <button id="depositBtn" class="btn btn-deposit">Deposit</button>
          </div>
        </div>

        <div class="action-card withdraw-card">
          <div class="action-icon withdraw-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 19V5"/>
              <path d="M5 12l7 7 7-7"/>
            </svg>
          </div>
          <h3>Withdraw Money</h3>
          <div class="input-group">
            <input type="number" id="withdrawAmount" placeholder="Enter amount" min="0.01" step="0.01">
            <button id="withdrawBtn" class="btn btn-withdraw">Withdraw</button>
          </div>
        </div>

        <div class="action-card transfer-card">
          <div class="action-icon transfer-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17,8 21,12 17,16"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </div>
          <h3>Quick Transfer</h3>
          <div class="input-group">
            <select id="transferType" class="transfer-select">
              <option value="savings">To Savings (+2% bonus)</option>
              <option value="investment">To Investment (+5% bonus)</option>
              <option value="charity">To Charity (tax deductible)</option>
            </select>
            <input type="number" id="transferAmount" placeholder="Enter amount" min="0.01" step="0.01">
            <button id="transferBtn" class="btn btn-transfer">Transfer</button>
          </div>
        </div>

        <div class="action-card loan-card">
          <div class="action-icon loan-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>
          <h3>Quick Loan</h3>
          <div class="input-group">
            <div class="loan-info">
              <span>Available: $<span id="maxLoan">500</span></span>
              <span class="loan-rate">Interest: 3%</span>
            </div>
            <input type="number" id="loanAmount" placeholder="Enter amount" min="50" max="500" step="50">
            <button id="loanBtn" class="btn btn-loan">Get Loan</button>
          </div>
        </div>
      </div>

      <div class="transaction-history">
        <h3>Recent Transactions</h3>
        <div id="transactionList" class="transaction-list">
          <div class="no-transactions">No transactions yet</div>
        </div>
      </div>
    </main>

    <div id="notification" class="notification hidden"></div>
  </div>
`

// Get DOM elements
const balanceElement = document.getElementById('balance')
const depositAmountInput = document.getElementById('depositAmount')
const withdrawAmountInput = document.getElementById('withdrawAmount')
const depositBtn = document.getElementById('depositBtn')
const withdrawBtn = document.getElementById('withdrawBtn')
const transactionList = document.getElementById('transactionList')
const notification = document.getElementById('notification')
const transferAmountInput = document.getElementById('transferAmount')
const transferTypeSelect = document.getElementById('transferType')
const transferBtn = document.getElementById('transferBtn')
const loanAmountInput = document.getElementById('loanAmount')
const loanBtn = document.getElementById('loanBtn')
const goalFill = document.getElementById('goalFill')
const goalPercentage = document.getElementById('goalPercentage')
const goalAmount = document.getElementById('goalAmount')
const maxLoan = document.getElementById('maxLoan')

// Update balance display
function updateBalance() {
  balanceElement.textContent = `$${bankingSystem.getBalance().toFixed(2)}`
  balanceElement.classList.add('balance-update')
  setTimeout(() => balanceElement.classList.remove('balance-update'), 300)
  updateSavingsGoal()
  updateLoanLimit()
}

// Update savings goal progress
function updateSavingsGoal() {
  const currentBalance = bankingSystem.getBalance()
  const goal = parseFloat(goalAmount.textContent)
  const percentage = Math.min((currentBalance / goal) * 100, 100)
  
  goalFill.style.width = `${percentage}%`
  goalPercentage.textContent = `${Math.round(percentage)}%`
  
  if (percentage >= 100) {
    goalFill.style.background = 'linear-gradient(90deg, #10b981, #059669)'
    showNotification('🎉 Congratulations! You\'ve reached your savings goal!', 'success')
  }
}

// Update loan limit based on balance
function updateLoanLimit() {
  const balance = bankingSystem.getBalance()
  const limit = Math.min(500, Math.max(50, balance * 0.5))
  maxLoan.textContent = limit.toFixed(0)
  loanAmountInput.max = limit
}

// Show notification
function showNotification(message, type = 'success') {
  notification.textContent = message
  notification.className = `notification ${type}`
  setTimeout(() => notification.classList.add('hidden'), 3000)
}

// Add transaction to history
function addTransaction(type, amount, success = true, description = '') {
  const transaction = document.createElement('div')
  transaction.className = `transaction ${type} ${success ? 'success' : 'failed'}`
  
  let icon, sign
  switch(type) {
    case 'deposit':
      icon = '↗'
      sign = '+'
      break
    case 'withdraw':
      icon = '↙'
      sign = '-'
      break
    case 'transfer':
      icon = '⇄'
      sign = '+'
      break
    case 'loan':
      icon = '💰'
      sign = '+'
      break
    default:
      icon = '•'
      sign = ''
  }
  
  const status = success ? 'Completed' : 'Failed'
  const displayType = description || (type.charAt(0).toUpperCase() + type.slice(1))
  
  transaction.innerHTML = `
    <div class="transaction-icon">${icon}</div>
    <div class="transaction-details">
      <div class="transaction-type">${displayType}</div>
      <div class="transaction-time">${new Date().toLocaleTimeString()}</div>
    </div>
    <div class="transaction-amount ${success ? '' : 'failed'}">${sign}$${amount.toFixed(2)}</div>
    <div class="transaction-status">${status}</div>
  `
  
  // Remove "no transactions" message if it exists
  const noTransactions = transactionList.querySelector('.no-transactions')
  if (noTransactions) {
    noTransactions.remove()
  }
  
  transactionList.insertBefore(transaction, transactionList.firstChild)
  
  // Keep only last 5 transactions
  const transactions = transactionList.querySelectorAll('.transaction')
  if (transactions.length > 5) {
    transactions[transactions.length - 1].remove()
  }
}

// Deposit functionality
depositBtn.addEventListener('click', () => {
  const amount = parseFloat(depositAmountInput.value)
  
  if (!amount || amount <= 0) {
    showNotification('Please enter a valid amount to deposit', 'error')
    return
  }
  
  const success = bankingSystem.deposit(amount)
  if (success) {
    updateBalance()
    addTransaction('deposit', amount, true)
    showNotification(`Successfully deposited $${amount.toFixed(2)}`, 'success')
    depositAmountInput.value = ''
  } else {
    addTransaction('deposit', amount, false)
    showNotification('Deposit failed. Please try again.', 'error')
  }
})

// Withdraw functionality
withdrawBtn.addEventListener('click', () => {
  const amount = parseFloat(withdrawAmountInput.value)
  
  if (!amount || amount <= 0) {
    showNotification('Please enter a valid amount to withdraw', 'error')
    return
  }
  
  const success = bankingSystem.withdraw(amount)
  if (success) {
    updateBalance()
    addTransaction('withdraw', amount, true)
    showNotification(`Successfully withdrew $${amount.toFixed(2)}`, 'success')
    withdrawAmountInput.value = ''
  } else {
    addTransaction('withdraw', amount, false)
    showNotification('Insufficient funds for this withdrawal', 'error')
  }
})

// Enter key support
depositAmountInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') depositBtn.click()
})

withdrawAmountInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') withdrawBtn.click()
})

// Input validation
function validateInput(input) {
  input.addEventListener('input', () => {
    const value = parseFloat(input.value)
    if (value < 0) {
      input.value = ''
    }
  })
}

validateInput(depositAmountInput)
validateInput(withdrawAmountInput)
validateInput(transferAmountInput)
validateInput(loanAmountInput)

// Transfer functionality
transferBtn.addEventListener('click', () => {
  const amount = parseFloat(transferAmountInput.value)
  const transferType = transferTypeSelect.value
  
  if (!amount || amount <= 0) {
    showNotification('Please enter a valid amount to transfer', 'error')
    return
  }
  
  if (amount > bankingSystem.getBalance()) {
    showNotification('Insufficient funds for this transfer', 'error')
    return
  }
  
  let bonus = 0
  let bonusRate = 0
  
  switch(transferType) {
    case 'savings':
      bonusRate = 0.02
      break
    case 'investment':
      bonusRate = 0.05
      break
    case 'charity':
      bonusRate = 0.0
      break
  }
  
  bonus = amount * bonusRate
  const totalAmount = amount + bonus
  
  // Withdraw the original amount
  const success = bankingSystem.withdraw(amount)
  if (success) {
    // Add back the total amount (original + bonus)
    bankingSystem.deposit(totalAmount)
    updateBalance()
    
    const transferTypeName = transferType.charAt(0).toUpperCase() + transferType.slice(1)
    addTransaction('transfer', amount, true, `${transferTypeName} (+${(bonusRate * 100).toFixed(0)}% bonus)`)
    
    if (bonus > 0) {
      showNotification(`Transfer successful! Bonus: $${bonus.toFixed(2)}`, 'success')
    } else {
      showNotification(`Transfer to ${transferTypeName} successful!`, 'success')
    }
    transferAmountInput.value = ''
  }
})

// Loan functionality
loanBtn.addEventListener('click', () => {
  const amount = parseFloat(loanAmountInput.value)
  const maxLoanAmount = parseFloat(maxLoan.textContent)
  
  if (!amount || amount <= 0) {
    showNotification('Please enter a valid loan amount', 'error')
    return
  }
  
  if (amount > maxLoanAmount) {
    showNotification(`Maximum loan amount is $${maxLoanAmount.toFixed(0)}`, 'error')
    return
  }
  
  // Calculate loan with 3% interest
  const interest = amount * 0.03
  const totalLoanAmount = amount + interest
  
  bankingSystem.deposit(totalLoanAmount)
  updateBalance()
  
  addTransaction('loan', amount, true, `Loan (3% interest: $${interest.toFixed(2)})`)
  showNotification(`Loan approved! Amount: $${totalLoanAmount.toFixed(2)}`, 'success')
  loanAmountInput.value = ''
})

// Enter key support for new inputs
transferAmountInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') transferBtn.click()
})

loanAmountInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') loanBtn.click()
})

// Initialize displays
updateBalance()