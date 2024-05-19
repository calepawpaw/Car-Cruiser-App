import { supabase, successNotification, errorNotification, doLogout } from "../main";

const btn_logout = document.getElementById("btn_logout");
btn_logout.onclick = doLogout;

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContentLoaded');
  getData();
});

async function getData() {
  const userId = localStorage.getItem('userId');
  console.log('User ID:', userId);

  let { data: user_info, error } = await supabase
      .from('user_info')
      .select('*')
      .eq('user_id', userId)
      .single();

  if (error) {
      console.error("Error fetching user info:", error);
      errorNotification("Failed to fetch user info.");
      return;
  }

  console.log('User info:', user_info);

const fullNameElem = document.getElementById("full_name");
const phoneNoElem = document.getElementById("phone_no");

console.log('Elements:', { fullNameElem, phoneNoElem });

if (fullNameElem && phoneNoElem) {
    fullNameElem.textContent = `${user_info.firstname || 'No first name'} ${user_info.lastname || 'No last name'}`;
    phoneNoElem.textContent = `Contact #: ${user_info.phone_no || 'No phone number'}`;
} else {
    console.error("One or more elements are missing from the DOM.");
}

}

