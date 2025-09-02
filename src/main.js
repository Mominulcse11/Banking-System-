import './style.css'
import { BankingSystem } from './banking-system.js'

const app = document.querySelector('#app')

const bankingSystem = new BankingSystem(4563.00)

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

// Update balance display
function updateBalance() {
  balanceElement.textContent = `$${bankingSystem.getBalance().toFixed(2)}`
  balanceElement.classList.add('balance-update')
  setTimeout(() => balanceElement.classList.remove('balance-update'), 300)
}

// Show notification
function showNotification(message, type = 'success') {
  notification.textContent = message
  notification.className = `notification ${type}`
  setTimeout(() => notification.classList.add('hidden'), 3000)
}

// Add transaction to history
function addTransaction(type, amount, success = true) {
  const transaction = document.createElement('div')
  transaction.className = `transaction ${type} ${success ? 'success' : 'failed'}`
  
  const icon = type === 'deposit' ? '↗' : '↙'
  const sign = type === 'deposit' ? '+' : '-'
  const status = success ? 'Completed' : 'Failed'
  
  transaction.innerHTML = `
    <div class="transaction-icon">${icon}</div>
    <div class="transaction-details">
      <div class="transaction-type">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
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