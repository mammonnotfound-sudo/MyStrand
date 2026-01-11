document.addEventListener('DOMContentLoaded', () => {
    // Gatekeeper: Ensure user is logged in
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert("You must be logged in to send a message.");
        window.location.href = 'login.html';
        return;
    }

    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    
    // Pre-fill user data
    // In a real app, you'd get the email from the user object, here we simulate it
    nameInput.value = loggedInUser;
    const users = JSON.parse(localStorage.getItem('myStrandUsers')) || [];
    const currentUser = users.find(u => u.username === loggedInUser);
    if (currentUser) {
        emailInput.value = currentUser.email;
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const messages = JSON.parse(localStorage.getItem('myStrandMessages')) || [];
        
        const newMessage = {
            id: Date.now(),
            senderUsername: loggedInUser,
            senderEmail: emailInput.value,
            subject: document.getElementById('contact-subject').value,
            initialMessage: document.getElementById('contact-message').value,
            timestamp: new Date().toLocaleString(),
            status: "new",
            replies: []
        };
        
        messages.push(newMessage);
        localStorage.setItem('myStrandMessages', JSON.stringify(messages));
        
        alert("Your message has been sent successfully!");
        window.location.href = 'user.html';
    });
});