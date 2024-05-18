import { supabase } from "../main"

// Load the transactions for the current user


async function loadTransactions() {
  const userId = 'USER_ID'; // Replace with the actual user ID
  const { data: transactions, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error loading transactions:', error);
    return;
  }

  const transactionsList = document.getElementById('transactions-list');
  transactionsList.innerHTML = ''; // Clear existing entries

  if (transactions.length === 0) {
    transactionsList.innerHTML = `
      <tr>
        <td colspan="3" class="text-center">No Transactions Found</td>
      </tr>
    `;
  } else {
    transactions.forEach(transaction => {
      const transactionRow = document.createElement('tr');
      transactionRow.innerHTML = `
        <td>${transaction.car_type}</td>
        <td>${transaction.pickup_date} to ${transaction.return_date}</td>
        <td>${transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}</td>
      `;
      transactionsList.appendChild(transactionRow);
    });
  }
}

document.addEventListener('DOMContentLoaded', loadTransactions);
