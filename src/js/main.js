// Import our custom CSS
import '../scss/styles.scss';

  
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

 import { setRouter } from './router/router.js';

//import Supabase
import { createClient } from '@supabase/supabase-js';

// Set Router
setRouter();

// Create a single supabase client for interacting with your database
const supabase = createClient("https://dirkjtwrtqkavolqnuyd.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpcmtqdHdydHFrYXZvbHFudXlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5NzgwNjAsImV4cCI6MjAyODU1NDA2MH0.Ohljq6o3R1sl0MAfmEE6ofIn-Dv2c6NSWGICw4rz7rA");

// Success Notification
function successNotification(message, seconds = 0) {
  document.querySelector(".alert-success").classList.remove("d-none");
  document.querySelector(".alert-success").classList.add("d-block");
  document.querySelector(".alert-success").innerHTML = message;

  if (seconds != 0) {
    setTimeout(function () {
      document.querySelector(".alert-success").classList.remove("d-block");
      document.querySelector(".alert-success").classList.add("d-none");
    }, seconds * 1000);
  }
}

// Error Notification
function errorNotification(message, seconds = 0) {
  document.querySelector(".alert-danger").classList.remove("d-none");
  document.querySelector(".alert-danger").classList.add("d-block");
  document.querySelector(".alert-danger").innerHTML = message;

  if (seconds != 0) {
    setTimeout(function () {
      document.querySelector(".alert-danger").classList.remove("d-block");
      document.querySelector(".alert-danger").classList.add("d-none");
    }, seconds * 1000);
  }
}

// Logout Function
async function doLogout() {
  // Supabase Logout
  let { error } = await supabase.auth.signOut();

  if (error == null) {
   // alert("Logout Successfully!");

    // Clear local Storage
    localStorage.clear();

    // Redirect to login page
    window.location.pathname = "/login.html";
  } 
}

export { supabase, successNotification, errorNotification, doLogout };