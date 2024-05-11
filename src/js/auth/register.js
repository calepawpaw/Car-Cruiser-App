import { supabase, successNotification, errorNotification } from "../main";

const form_register = document.getElementById("form_register");

form_register.onsubmit = async (e) => {
  e.preventDefault();

  // Disable the submit button
  document.querySelector("#form_register button").disabled = true;
  document.querySelector(
    "#form_register button"
  ).innerHTML = `<div class="spinner-border me-2" role="status">
                    </div>
                    <span>Loading...</span>`;

  // Get All values from input, select, textarea under form tag
  const formData = new FormData(form_register);

  // Check if bot password and password confirmation is the same
  if (formData.get("password") == formData.get("confirm_password")) {
    // Do action if the condition is correct

    // Supabase SignUp
    const { data, error } = await supabase.auth.signUp({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    // Store into variable the user_id
    let user_id = data.user.id;

    // Check if user_id does exist; registered
    if (user_id != null) {
      // Supabase user_informations table
      const { data, error } = await supabase
        .from("user_info")
        .insert([
          {
            firstname: formData.get("firstname"),
            lastname: formData.get("lastname"),
           phone_no: formData.get("phone_no"),
            user_id: user_id,
          },
        ])
        .select();

      // Show Notification
      if (error == null) {
        successNotification("Registered Successfully! <a href='/login.html'>Click here to Login!`</a>",10);
        console.log(data);

      }
      else {
        errorNotification("Something wrong happened. Cannot register account.",10);
        console.log(error);
      }
  

      // Reset Form
      form_register.reset();

      // Enable Submit Button
      document.querySelector("#form_register button").disabled = false;
      document.querySelector("#form_register button").innerHTML = `Register`;
    }
  }
};