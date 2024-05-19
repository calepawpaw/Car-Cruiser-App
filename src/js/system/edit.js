import { supabase, successNotification, errorNotification } from '../main.js';

function setupImageChange() {
    const fileInput = document.getElementById("userAvatar");
    const imageElement = document.getElementById("selectedAvatar");
    if (fileInput && imageElement) {
        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    imageElement.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    setupFormListener();
    fetchData();
    setupImageChange();
});

async function fetchData() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        errorNotification("User ID not found in local storage.");
        return;
    }

    const { data: user_info, error } = await supabase
        .from('user_info')
        .select('*')
        .eq('user_id', userId)
        .single();

    if (error) {
        console.error("Error fetching user info:", error);
        errorNotification("Failed to fetch user info.");
        return;
    }

    document.getElementById("firstname").value = user_info.firstname || '';
    document.getElementById("lastname").value = user_info.lastname || '';
    document.getElementById("phone_no").value = user_info.phone_no || '';
    document.getElementById("selectedAvatar").src = user_info.image_path || 'assets/imgs/profile.jpg';
}

function setupFormListener() {
    const form_edit = document.getElementById("form_edit");
    if (!form_edit) {
      console.error("Edit form not found on the page.");
      return;
    }
  
    form_edit.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form_edit);
      const updates = {
        firstname: formData.get("firstname"),
        lastname: formData.get("lastname"),
        phone_no: formData.get("phone_no")
      };
  
      const userId = localStorage.getItem('userId');
      if (!userId) {
        errorNotification("User ID not found in local storage.");
        return;
      }
  
      try {
        const { error } = await supabase
            .from('user_info')
            .update(updates)
            .eq("user_id", userId);
  
        if (error) {
          throw error;
        }
  
        successNotification("Profile Successfully updated.");
        setTimeout(() => {
          window.location.reload(); // Reload page to reflect updated data
        }, 1000);
      } catch (error) {
        console.error("Updating profile failed:", error.message);
        errorNotification("Something went wrong: " + error.message);
      }
    });
  }