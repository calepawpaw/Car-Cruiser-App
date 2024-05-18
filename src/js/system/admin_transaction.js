import { supabase } from "../main"

async function loadTransactions() {
  
    const { data: transactions, error } = await supabase
      .from("transaction")
      .select('*, user_info(*)')
      .eq('status', 'pending');
  
    if (error) {
      console.error('Error loading transactions:', error);
    } else {
      const transactionsList = document.getElementById('transactions-list');
      transactionsList.innerHTML = ''; // Clear existing entries
  
      transactions.forEach(transaction => {
        const transactionItem = document.createElement('div');
        transactionItem.className = 'card mb-2';
        transactionItem.innerHTML = `
          <div class="card-body p-2">
            <h6 class="card-title">${transaction.name}</h6>
            <p class="card-text mb-1"><strong>Phone Number:</strong> ${transaction.phone}</p>
            <p class="card-text mb-1"><strong>Car Type:</strong> ${transaction.car_type}</p>
            <p class="card-text mb-1"><strong>Pick Up Date:</strong> ${transaction.pickup_date}</p>
            <p class="card-text mb-1"><strong>Return Date:</strong> ${transaction.return_date}</p>
            <p class="card-text mb-1"><strong>Destination:</strong> ${transaction.destination}</p>
            <p class="card-text mb-1"><strong>Price:</strong> ${transaction.price}</p>
            <div class="d-flex justify-content-evenly">
              <button class="btn btn-success btn-sm approve-btn" data-id="${transaction.id}">Approve</button>
              <button class="btn btn-danger btn-sm disapprove-btn" data-id="${transaction.id}">Disapprove</button>
            </div>
          </div>
        `;
        transactionsList.appendChild(transactionItem);
      });
  
      document.querySelectorAll('.approve-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
          const transactionId = e.target.getAttribute('data-id');
          await updateTransactionStatus(transactionId, 'approved');
        });
      });
  
      document.querySelectorAll('.disapprove-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
          const transactionId = e.target.getAttribute('data-id');
          await updateTransactionStatus(transactionId, 'disapproved');
        });
      });
    }
  }
  
  async function updateTransactionStatus(id, status) {
    const { data, error } = await supabase
      .from('transactions')
      .update({ status: status })
      .eq('id', id);
  
    if (error) {
      console.error(`Error updating transaction status to ${status}:`, error);
    } else {
      alert(`Transaction ${status}`);
      loadTransactions();
    }
  }
  
  document.addEventListener('DOMContentLoaded', loadTransactions);