/**
 * ==========================================================================
 * MyStrand - User Inbox JavaScript (with Reply Functionality)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- GATEKEEPER ---
    const loggedInUsername = sessionStorage.getItem('loggedInUser');
    if (!loggedInUsername) {
        window.location.href = 'login.html';
        return;
    }

    const inboxContainer = document.getElementById('inbox-container');
    const clearInboxBtn = document.getElementById('clear-inbox-btn');

    function renderInbox() {
        inboxContainer.innerHTML = '';
        const allUsers = JSON.parse(localStorage.getItem('myStrandUsers')) || [];
        const currentUser = allUsers.find(user => user.username === loggedInUsername);
        
        if (!currentUser) {
            inboxContainer.innerHTML = '<p class="placeholder-text">Could not find user profile.</p>';
            return;
        }
        const currentUserEmail = currentUser.email;
        
        const allMessages = JSON.parse(localStorage.getItem('myStrandMessages')) || [];
        const myMessages = allMessages.filter(msg => msg.senderEmail === currentUserEmail).reverse();

        if (myMessages.length === 0) {
            inboxContainer.innerHTML = '<p class="placeholder-text">You have no messages.</p>';
            if (clearInboxBtn) clearInboxBtn.style.display = 'none';
        } else {
            if (clearInboxBtn) clearInboxBtn.style.display = 'inline-block';
            myMessages.forEach(msg => {
                const thread = document.createElement('div');
                thread.className = 'message-thread';
                
                // Display initial message and all replies
                let conversationHTML = msg.replies.map(reply => `
                    <div class="message-bubble ${reply.author === 'admin' ? 'admin' : 'user'}">
                        <strong>${reply.author === 'admin' ? 'Admin Reply' : 'Your Reply'}:</strong>
                        <p>${reply.message}</p>
                        <span class="timestamp">${reply.timestamp}</span>
                    </div>`).join('');

                // NEW: Added the reply form to each thread
                thread.innerHTML = `
                    <h3>Subject: ${msg.subject}</h3>
                    <div class="message-bubble user">
                        <strong>Your Original Message:</strong>
                        <p>${msg.initialMessage}</p>
                        <span class="timestamp">${msg.timestamp}</span>
                    </div>
                    ${conversationHTML}
                    <form class="reply-form" data-id="${msg.id}">
                        <textarea placeholder="Write your reply..." required></textarea>
                        <button type="submit" class="action-btn">Send Reply</button>
                    </form>
                `;
                inboxContainer.appendChild(thread);
            });
        }
    }

    // NEW: Master event listener for handling reply submissions
    inboxContainer.addEventListener('submit', function(e) {
        if (e.target.matches('.reply-form')) {
            e.preventDefault();
            
            const form = e.target;
            const messageId = parseInt(form.dataset.id);
            const replyText = form.querySelector('textarea').value;
            
            if (!replyText.trim()) return; // Don't send empty messages

            const allMessages = JSON.parse(localStorage.getItem('myStrandMessages')) || [];
            const messageIndex = allMessages.findIndex(msg => msg.id === messageId);

            if (messageIndex > -1) {
                const newReply = {
                    author: loggedInUsername, // The author is the current user
                    message: replyText,
                    timestamp: new Date().toLocaleString()
                };
                
                // Add the new reply and update the status for the admin
                allMessages[messageIndex].replies.push(newReply);
                allMessages[messageIndex].status = 'new'; // Mark as 'new' so admin sees the reply
                
                // Save the updated messages array
                localStorage.setItem('myStrandMessages', JSON.stringify(allMessages));
                
                // Re-render the inbox to show the new message instantly
                renderInbox();
            }
        }
    });

    if (clearInboxBtn) {
        clearInboxBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete all of your messages? This cannot be undone.')) {
                const allMessages = JSON.parse(localStorage.getItem('myStrandMessages')) || [];
                // Keep only the messages that DO NOT belong to the current user
                const otherUsersMessages = allMessages.filter(msg => msg.senderUsername !== loggedInUser);
                // Save the filtered array back to localStorage
                localStorage.setItem('myStrandMessages', JSON.stringify(otherUsersMessages));
                // Re-render the inbox to show it's empty
                renderInbox();
            }
        });
    }

    renderInbox(); // Initial render of the inbox
});