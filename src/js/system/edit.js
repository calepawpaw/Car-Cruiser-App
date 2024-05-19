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

    document.getElementById("selectedAvatar").src = user_info.image_path || 'assets/imgs/profile.jpg';
}

async function uploadImage(file) {
    const path = `public/${Date.now()}-${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, file, {
            cacheControl: '3600',
            upsert: false
        });
    if (uploadError) {
        throw new Error(uploadError.message);
    }
    return path;  // Return the full path used for upload
}

function setupFormListener() {
    const form_edit = document.getElementById("form_edit");
    if (!form_edit) {
        console.error("Edit form not found on the page.");
        return;
    }

    form_edit.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fileInput = document.getElementById("userAvatar").files[0];

        const userId = localStorage.getItem('userId');
        if (!userId) {
          errorNotification("User ID not found in local storage.");
          return;
        }

        try {
          if (fileInput) {
            const imagePath = await uploadImage(fileInput);
            const updates = { image_path: `https://dirkjtwrtqkavolqnuyd.supabase.co/storage/v1/object/public/avatars/${imagePath}` };

            const { error } = await supabase
                .from('user_info')
                .update(updates)
                .eq("user_id", userId);

            if (error) {
              throw error;
            }

            successNotification("Profile image successfully updated.");
            setTimeout(() => {
              window.location.href = '/profile.html'; // Change to your actual profile page URL
            }, 1000);
          }
        } catch (error) {
          console.error("Updating profile image failed:", error.message);
          errorNotification("Something went wrong: " + error.message);
        }
    });
}
