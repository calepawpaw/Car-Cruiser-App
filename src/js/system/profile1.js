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

  const fullNameElem = document.getElementById("full_name");
  const phoneNoElem = document.getElementById("phone_no");
  const avatarElem = document.getElementById("user_avatar"); // Ensure this ID matches your image element in HTML
  
  if (fullNameElem && phoneNoElem && avatarElem) {
      fullNameElem.textContent = `${user_info.firstname || 'No first name'} ${user_info.lastname || 'No last name'}`;
      phoneNoElem.textContent = `Contact #: ${user_info.phone_no || 'No phone number'}`;
      avatarElem.src = user_info.image_path || 'assets/imgs/profile.jpg'; // Fallback to default if null
  } else {
      console.error("One or more elements are missing from the DOM.");
      errorNotification("Unable to load some profile elements.");
  }
}
