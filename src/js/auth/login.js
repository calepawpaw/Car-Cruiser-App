import { supabase, successNotification, errorNotification } from "../main";

const form_login = document.getElementById("login_form");

login_form.onsubmit = async (e) => {
    e.preventDefault();

    // Disable the button and show a spinner
    const loginButton = document.querySelector("#login_form button");
    loginButton.disabled = true;
    loginButton.innerHTML = '<div class="spinner-border me-2" role="status"></div>';

    const formData = new FormData(login_form);

    // Attempt to sign in
    let { data, error } = await supabase.auth.signInWithPassword({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (error) {
        errorNotification("Login failed: " + error.message, 2);
        console.error(error);
    } else if (data) {
        let session = data.session;
        let user = data.user;
        const userId = user.id;

        console.log(user);

        if (session) {
            localStorage.setItem("access_token", session.access_token);
            localStorage.setItem("refresh_token", session.refresh_token);
            localStorage.setItem("userId", userId);

            // Retrieve user information
            let { data: user_info, error } = await supabase
                .from("user_info")
                .select("*")
                .eq("user_id", userId);

            if (error) {
                errorNotification("Failed to fetch user information: " + error.message, 2);
                console.error(error);
            } else if (user_info && user_info.length > 0) {
                localStorage.setItem("role", user_info[0].role);
                const user_role = user_info[0].role;

                if (user_role === "admin") {
                    window.location.pathname = '/admin.html';
                } else {
                    window.location.pathname = '/main.html';
                }

                successNotification("Login Successfully!");
            } else {
                errorNotification("No user information found", 2);
            }
        } else {
            errorNotification("No session available", 2);
        }
    }

    // Reset form and re-enable the button
    form_login.reset();
    loginButton.disabled = false;
    loginButton.innerHTML = 'Login';
};
