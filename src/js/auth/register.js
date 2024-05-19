import { supabase, successNotification, errorNotification } from "../main";

const form_register = document.getElementById("form_register");

form_register.onsubmit = async (e) => {
  e.preventDefault();

  // Disable the submit button
  const submitButton = document.querySelector("#form_register button");
  submitButton.disabled = true;
  submitButton.innerHTML = `<div class="spinner-border me-2" role="status"></div><span>Loading...</span>`;

  // Get All values from input, select, textarea under form tag
  const formData = new FormData(form_register);

  // Check if both password and password confirmation is the same
  if (formData.get("password") === formData.get("confirm_password")) {
    // Supabase SignUp
    const { user, error: signUpError } = await supabase.auth.signUp({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (signUpError) {
      errorNotification(`Registration failed: ${signUpError.message}`, 10);
      console.error(signUpError);
    } else if (user) {
      // Insert user information in the Supabase user_info table
      const { error: insertError } = await supabase
        .from("user_info")
        .insert([
          {
            firstname: formData.get("firstname"),
            lastname: formData.get("lastname"),
            phone_no: formData.get("phone_no"),
            user_id: user.id,
          },
        ]);

      if (insertError) {
        errorNotification(`Failed to save user info: ${insertError.message}`, 10);
        console.error(insertError);
      } else {
        successNotification("Registered Successfully! <a href='/login.html'>Click here to Login!</a>", 10);
      }
    }

    // Reset Form
    form_register.reset();
  } else {
    errorNotification("Passwords do not match. Please check and try again.", 10);
  }

  // Enable Submit Button
  submitButton.disabled = false;
  submitButton.innerHTML = `Register`;
};
