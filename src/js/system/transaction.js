//transaction1. js

import { supabase } from "../main";

// Function to fetch and display transactions
async function displayTransactions() {
  try {
    // Fetch transactions data from Supabase
    const { data, error } = await supabase
      .from("transactions")
      .select("*, user_info(*)");
        
    if (error) {
      throw error;
      
    }

    // Reference to the list group where transactions will be displayed
    const transactionList = document.querySelector(".list-group");

    // Clear existing cards
    transactionList.innerHTML = "";

    // Iterate through the transactions data and populate the cards
    data.forEach((transaction) => {
      const card = document.createElement("div");
      card.classList.add("card", "mb-2");

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body", "p-2");

      const title = document.createElement("h6");
      title.classList.add("card-title");
      title.textContent = transaction.user_info.firstname + " " + transaction.user_info.lastname;

      const phoneNumber = createCardText("Phone Number", transaction.user_info.phone_number);
      const carType = createCardText("Car Type", transaction.user_info.car_type);
      const pickUpDate = createCardText("Pick Up Date", transaction.pick_up_date);
      const returnDate = createCardText("Return Date", transaction.return_date);
      const destination = createCardText("Destination", transaction.destination);

      const actions = document.createElement("div");
      actions.classList.add("d-flex", "justify-content-between");

      const approveBtn = createButton("Approve", async () => await approveTransaction(transaction.id));
      const disapproveBtn = createButton("Disapprove", async () => await disapproveTransaction(transaction.id));

      actions.appendChild(approveBtn);
      actions.appendChild(disapproveBtn);

      cardBody.appendChild(title);
      cardBody.appendChild(phoneNumber);
      cardBody.appendChild(carType);
      cardBody.appendChild(pickUpDate);
      cardBody.appendChild(returnDate);
      cardBody.appendChild(destination);
      cardBody.appendChild(actions);

      card.appendChild(cardBody);

      transactionList.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching transactions:", error.message);
  }
}

// Function to create card text element
function createCardText(label, text) {
  const p = document.createElement("p");
  p.classList.add("card-text", "mb-1");
  p.innerHTML = `<strong>${label}:</strong> ${text}`;
  return p;
}

// Function to create button element
function createButton(text, onClick) {
  const btn = document.createElement("button");
  btn.classList.add("btn", "btn-sm", "btn-success");
  btn.textContent = text;
  btn.addEventListener("click", onClick);
  return btn;
}

// Function to approve a transaction
async function approveTransaction(transactionId) {
  try {
    // Update the transaction status in the Supabase "transactions" table
    const { error } = await supabase
      .from("transactions")
      .update({ status: "approved" })
      .select("*, user_info(*)")
      .eq("id", transactionId);

    if (error) {
      throw error;
    }

    // Refresh the transactions list
    displayTransactions();
  } catch (error) {
    console.error("Error approving transaction:", error.message);
  }
}

// Function to disapprove a transaction
async function disapproveTransaction(transactionId) {
  try {
    // Update the transaction status in the Supabase "transactions" table
    const { error } = await supabase
      .from("transactions")
      .update({ status: "disapproved" })
      .eq("id", transactionId);

    if (error) {
      throw error;
    }

    // Refresh the transactions list
    displayTransactions();
  } catch (error) {
    console.error("Error disapproving transaction:", error.message);
  }
}

// Call the displayTransactions function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", displayTransactions);