/* ==========================================================================
   MyStrand - Authentication JavaScript (with Admin/User Roles)
   Updated: September 14, 2025
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- SHARED FUNCTIONS ---
    const getStoredUsers = () => JSON.parse(localStorage.getItem('myStrandUsers')) || [];
    const saveUsers = (users) => localStorage.setItem('myStrandUsers', JSON.stringify(users));

    // --- INITIALIZE ADMIN ACCOUNT ---
    // This runs once to ensure there is always a default admin account.
    (function initializeAdmin() {
        const users = getStoredUsers();
        const adminExists = users.some(user => user.role === 'admin');
        if (!adminExists) {
            const defaultAdmin = {
                username: 'admin',
                password: 'password123', // In a real app, this should be more secure
                email: 'admin@mystrand.com',
                role: 'admin' // The crucial role property
            };
            users.push(defaultAdmin);
            saveUsers(users);
            console.log('Default admin account created. Username: admin, Password: password123');
        }
    })();


    // --- LOGOUT MESSAGE HANDLER ---
    // This checks the URL for a 'loggedout' message when the page loads.
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('loggedout')) {
        const messageContainer = document.getElementById('result-message');
        if (messageContainer) {
            messageContainer.textContent = 'You have been successfully logged out.';
            messageContainer.style.display = 'block';
        }
    }

    // --- SIGNUP PAGE LOGIC ---
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        const errorMessage = document.getElementById('error-message');

        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            errorMessage.style.display = 'none';

            // Get form values
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const email = document.getElementById('email').value.trim();
            
            const users = getStoredUsers();

            // Validations
            if (password !== confirmPassword) {
                errorMessage.textContent = 'Passwords do not match!';
                errorMessage.style.display = 'block';
                return;
            }
            if (users.find(user => user.username === username)) {
                errorMessage.textContent = 'Username is already taken.';
                errorMessage.style.display = 'block';
                return;
            }
            if (users.find(user => user.email === email)) {
                errorMessage.textContent = 'Email is already registered.';
                errorMessage.style.display = 'block';
                return;
            }

            // Create new user object with the 'user' role
            const newUser = {
                username, password, email,
                role: 'user', // All new signups are 'user' role
                contact: document.getElementById('contact').value,
                age: document.getElementById('age').value,
                school: document.getElementById('school').value,
                gradeSection: document.getElementById('grade-section').value,
                lrn: document.getElementById('lrn').value,
                gender: document.querySelector('input[name="gender"]:checked').value
            };
            
            users.push(newUser);
            saveUsers(users);

            alert('Account created successfully! You will now be redirected to the login page.');
            window.location.href = 'login.html';
        });
    }

    // --- LOGIN PAGE LOGIC (with Role Redirection) ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        const errorMessage = document.getElementById('error-message');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            errorMessage.style.display = 'none';

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            const users = getStoredUsers();
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                // Login successful, now check the role
                sessionStorage.setItem('loggedInUser', user.username);
                sessionStorage.setItem('userRole', user.role); // Store the role for other pages to check

                // Redirect based on role
                if (user.role === 'admin') {
                    window.location.href = 'admin.html'; // Redirect admins to admin page
                } else {
                    window.location.href = 'user.html'; // Redirect users to main user page
                }
            } else {
                errorMessage.textContent = 'Invalid username or password.';
                errorMessage.style.display = 'block';
            }
        });
    }

    // --- FORGOT PASSWORD PAGE LOGIC ---
    const forgotForm = document.getElementById('forgot-form');
    if (forgotForm) {
        const resultMessage = document.getElementById('result-message');

        forgotForm.addEventListener('submit', (e) => {
            e.preventDefault();
            resultMessage.style.display = 'none';
            resultMessage.classList.remove('error-message');

            const email = document.getElementById('email').value;
            const users = getStoredUsers();
            const user = users.find(u => u.email === email);

            if (user) {
                // In a real app, you would EMAIL a reset link.
                // Here, we just show the password for demonstration.
                resultMessage.innerHTML = `
                    <strong>Password Found!</strong><br>
                    Password for ${user.username} is: <strong>${user.password}</strong><br>
                    <small>Note: Showing passwords like this is insecure and for demonstration only.</small>
                `;
                resultMessage.style.display = 'block';
            } else {
                resultMessage.textContent = 'No account found with that email address.';
                resultMessage.classList.add('error-message');
                resultMessage.style.display = 'block';
            }
        });
    }
});