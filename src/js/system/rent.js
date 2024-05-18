//rent. js

import { supabase, successNotification, errorNotification } from "../main";

const form_rent = document.getElementById("form_rent");

form_rent.onsubmit = async (e) => {
  e.preventDefault();

const userId = localStorage.getItem("userId");


        const formData = new FormData(form_rent);
        const address = document.getElementById('address').value;
        const idType = document.getElementById('idType').value;
        const id_Num = document.getElementById('id_Num').value;
        const pickup_date = document.getElementById('pickup_date').value;
        const return_date = document.getElementById('return_date').value;
        const destination = document.getElementById('destination').value;
        const payment = document.getElementById('payment').value;
        // const status = "";

  // Disable button
  const submitButton = document.querySelector("#form_rent button");
  submitButton.disabled = true;
  submitButton.innerHTML =
    '<div class="spinner-border me-2" role="status"></div';

  try {
    const transactionData = await createTransaction({
      address,
      idType,
      id_Num,
      pickup_date,
      return_date,
      destination,
      payment,
    //   status: "",
    
    });

    if (transactionData === null) {
      console.log("Error creating appointment.");
      return;
    }

    if (transactionData.error) {
      errorNotification("Cannot Rent a Car.", 10);
      console.log(transactionData.error);
      return;
    }

    successNotification("Rent successfully!", 10);
    // Reset Form
    form_rent.reset();
    // Enable submit button
    submitButton.disabled = false;
    submitButton.innerHTML = "Check Out";

    // Display transactions after successful checkout
    // displayTransactions();
  } catch (error) {
    errorNotification("Error Renting Cars. Please try again later.", 10);
    console.log(error);
    // Enable submit button
    submitButton.disabled = false;
    submitButton.innerHTML = "Check Out";
  }
};

async function createTransaction(data) {
    try {
      console.log("Transaction data to be inserted:", data); // Pagsusi sa data nga gisulod
      const { data: transactionData, error } = await supabase
        .from("transaction")
        .insert([
          {
            address: data.address,
            pickup_date: data.pickup_date,
            id_Num: data.id_Num,
            idType: data.idType,
            return_date: data.return_date,
            destination: data.destination,
            payment: data.payment,
        //  status: "pending", // Default status
          },
        ])
        .select("*, user_info(firstname, lastname)")
        .single();
  
      console.log("Transaction data returned:", transactionData);
  
      return transactionData;
    } catch (error) {
      console.error("Error creating transaction:", error); 
      return { error };
    }
  }