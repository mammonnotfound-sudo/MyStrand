document.addEventListener('DOMContentLoaded', function() {
    // --- GATEKEEPER ---
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }

    // --- DOM ELEMENT REFERENCES ---
    const profileCard = document.getElementById('profile-card');
    const editBtn = document.getElementById('edit-profile-btn');
    const saveBtn = document.getElementById('save-changes-btn');
    const cancelBtn = document.getElementById('cancel-changes-btn');
    const avatarUpload = document.getElementById('avatar-upload');
    const profileAvatar = document.getElementById('profile-avatar');

    // View mode elements
    const view = {
        username: document.getElementById('view-username'),
        profileUsername: document.getElementById('profile-username'), // The name in the sidebar
        email: document.getElementById('view-email'),
        contact: document.getElementById('view-contact'),
        age: document.getElementById('view-age'),
        gender: document.getElementById('view-gender'),
        school: document.getElementById('view-school'),
        gradeSection: document.getElementById('view-gradeSection'),
        lrn: document.getElementById('view-lrn'),
    };
    
    // Edit mode elements
    const edit = {
        username: document.getElementById('edit-username'),
        email: document.getElementById('edit-email'),
        contact: document.getElementById('edit-contact'),
        age: document.getElementById('edit-age'),
        gender: document.getElementById('edit-gender'),
        school: document.getElementById('edit-school'),
        gradeSection: document.getElementById('edit-gradeSection'),
        lrn: document.getElementById('edit-lrn'),
    };

    // --- DATA HANDLING ---
    // This now reads from your new 'myStrandUsers' array
    function getCurrentUser() {
        const users = JSON.parse(localStorage.getItem('myStrandUsers')) || [];
        return users.find(user => user.username === loggedInUser);
    }

    function saveCurrentUser(updatedUser) {
        let users = JSON.parse(localStorage.getItem('myStrandUsers')) || [];
        // Find the index of the current user and update their data
        const userIndex = users.findIndex(user => user.username === loggedInUser);
        if (userIndex !== -1) {
            users[userIndex] = updatedUser;
            localStorage.setItem('myStrandUsers', JSON.stringify(users));
        }
    }
    
    let currentUser = getCurrentUser();

    // --- UI FUNCTIONS ---
    function populateProfileData() {
        if (!currentUser) return; // Exit if user not found
        view.username.textContent = currentUser.username;
        view.profileUsername.textContent = currentUser.username;
        view.email.textContent = currentUser.email || 'N/A';
        view.contact.textContent = currentUser.contact || 'N/A';
        view.age.textContent = currentUser.age || 'N/A';
        view.gender.textContent = currentUser.gender || 'N/A';
        view.school.textContent = currentUser.school || 'N/A';
        view.gradeSection.textContent = currentUser.gradeSection || 'N/A';
        view.lrn.textContent = currentUser.lrn || 'N/A';
        profileAvatar.src = currentUser.avatar || 'pictures/default-avatar.png';
    }

    function enterEditMode() {
        profileCard.classList.add('edit-mode');
        editBtn.style.display = 'none';
        saveBtn.style.display = 'inline-flex';
        cancelBtn.style.display = 'inline-flex';

        // Populate input fields with current data
        edit.email.value = currentUser.email || '';
        edit.contact.value = currentUser.contact || '';
        edit.age.value = currentUser.age || '';
        edit.gender.value = currentUser.gender || 'Male';
        edit.school.value = currentUser.school || '';
        edit.gradeSection.value = currentUser.gradeSection || '';
        edit.lrn.value = currentUser.lrn || '';
    }

    function exitEditMode() {
        profileCard.classList.remove('edit-mode');
        editBtn.style.display = 'inline-flex';
        saveBtn.style.display = 'none';
        cancelBtn.style.display = 'none';
    }

    // --- EVENT LISTENERS ---
    editBtn.addEventListener('click', enterEditMode);
    
    cancelBtn.addEventListener('click', () => {
        exitEditMode();
        populateProfileData(); 
    });

    saveBtn.addEventListener('click', () => {
        // Update the user object with new values
        currentUser.email = edit.email.value;
        currentUser.contact = edit.contact.value;
        currentUser.age = edit.age.value;
        currentUser.gender = edit.gender.value;
        currentUser.school = edit.school.value;
        currentUser.gradeSection = edit.gradeSection.value;
        currentUser.lrn = edit.lrn.value;
        // Avatar is saved separately

        saveCurrentUser(currentUser);
        populateProfileData();
        exitEditMode();
        alert('Profile updated successfully!');
    });

    avatarUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const newAvatarSrc = e.target.result;
                profileAvatar.src = newAvatarSrc;
                currentUser.avatar = newAvatarSrc;
                saveCurrentUser(currentUser);
            };
            reader.readAsDataURL(file);
        }
    });

    // --- INITIALIZATION ---
    populateProfileData();
});