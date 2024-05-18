import { supabase, successNotification, errorNotification } from "../main";


const form_login = document.getElementById("login_form");

login_form.onsubmit = async (e) => {
    e.preventDefault();
     //Disable button
     document.querySelector("#login_form button").disabled = true;
     document.querySelector("#login_form button").innerHTML = '<div class="spinner-border me-2" role="status"></div>';

    const formData = new FormData(login_form);

    //supabase sign-in
let { data, error } = await supabase.auth.signInWithPassword({
  email: formData.get("email"),
  password: formData.get("password"),
});

let session = data.session;
let user = data.user;
const userId = data.user.id;

console.log(user);

if (session != null) {
  // Store tokens for API
  localStorage.setItem("access_token", session.access_token);
  localStorage.setItem("refresh_token", session.refresh_token);
  localStorage.setItem("userId", userId);

  // Retrieve user information
  let { data: user_info, error } = await supabase
      .from("user_info")
      .select("*")
      .eq("user_id", user.id);

      localStorage.setItem("role", user_info[0].role);
      
  if (user_info.length > 0) {
      const user_role = user_info[0].role;

      // Check if user is an admin
      if (user_role === "admin") {
          // Redirect to admin page
          window.location.pathname = '/admin.html';
      } else {
          // For non-admin users, redirect to main page
          window.location.pathname = '/main.html';
      }

      successNotification("Login Successfully!");
  } else {
      errorNotification("Cannot fetch user information", 2);
  }
} else {
  errorNotification("Cannot login account", 2);
  console.log(error);
}


    // Resetting form
    form_login.reset();
     //Enable submit button
     document.querySelector("#login_form button").disabled = false;
     document.querySelector("#login_form button").innerHTML = 'login';

    
};


// // // const login_form = document.getElementById("login_form");

// // // login_form.onsubmit = async (e) => {
// // //     e.preventDefault();

// // //     //Get all Values from input, select, textarea under form tag
// // //     const formData = new FormData(login_form);

// // //     let { data, error } = await supabase.auth.signInWithPassword({
// // //         email: formData.get("email"),
// // //         password: formData.get("password"),
// // //       });

// // //       console.log(data);
// // // }