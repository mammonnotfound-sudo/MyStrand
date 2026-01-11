document.addEventListener('DOMContentLoaded', () => {
    // --- GATEKEEPER ---
    const currentUser = sessionStorage.getItem('loggedInUser');
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // --- DOM ELEMENT REFERENCES ---
    const convItemsContainer = document.getElementById('conv-items');
    // ... (rest of DOM elements are the same)

    // --- LOAD DATA FROM LOCALSTORAGE ---
    // This is the main change: we get all user info from myStrandUsers
    const allUsers = JSON.parse(localStorage.getItem('myStrandUsers')) || [];
    let allMessages = JSON.parse(localStorage.getItem('allMessages')) || [];

    // Create a quick lookup object for profiles from the allUsers array
    const userProfiles = allUsers.reduce((acc, user) => {
        acc[user.username] = user;
        return acc;
    }, {});

    // The rest of the inbox.js script can now work as it did before,
    // because we have recreated the 'userProfiles' object it needs.
    // The previous inbox.js code from the "full name" update is already compatible.
    
    // --- UI FUNCTIONS ---
    // (The rest of the inbox.js code remains the same as the "final version" I gave you before)
    // For completeness, the full correct code is below.
    const searchInput = document.getElementById('search-conversations');
    const newMessageBtn = document.getElementById('new-message-btn');
    const chatWithName = document.getElementById('chat-with-name');
    const chatMessages = document.getElementById('chat-messages');
    const chatInputArea = document.getElementById('chat-input-area');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-message-btn');
    const userSearchModal = document.getElementById('user-search-modal');
    const closeModalBtn = document.getElementById('close-search-modal');
    const modalSearchInput = document.getElementById('modal-search-input');
    const modalUserList = document.getElementById('modal-user-list');

    let activeConversation = null;

    function renderConversations(filter = '') {
        convItemsContainer.innerHTML = '';
        const conversations = {};
        allMessages.forEach(msg => {
            let contactUsername = null;
            if (msg.from === currentUser) contactUsername = msg.to;
            if (msg.to === currentUser) contactUsername = msg.from;
            if (contactUsername) conversations[contactUsername] = msg;
        });

        Object.keys(conversations).forEach(contactUsername => {
            const profile = userProfiles[contactUsername] || {};
            const displayName = profile.username; // Display username in contacts

            if (!displayName.toLowerCase().includes(filter.toLowerCase())) return;

            const lastMessage = conversations[contactUsername];
            const convItem = document.createElement('div');
            convItem.className = 'conversation-item';
            convItem.dataset.contact = contactUsername;
            if (contactUsername === activeConversation) convItem.classList.add('active');

            convItem.innerHTML = `
                <img src="${profile.avatar || 'pictures/default-avatar.png'}" alt="${displayName}">
                <div class="conv-details">
                    <div class="conv-name">${displayName}</div>
                    <div class="conv-preview">${lastMessage.from === currentUser ? 'You: ' : ''}${lastMessage.text}</div>
                </div>
            `;
            convItem.addEventListener('click', () => selectConversation(contactUsername));
            convItemsContainer.appendChild(convItem);
        });
    }

    function selectConversation(contactUsername) {
        activeConversation = contactUsername;
        renderConversations(searchInput.value);

        const profile = userProfiles[contactUsername] || {};
        const displayName = profile.username;

        chatWithName.textContent = displayName;
        chatMessages.innerHTML = '';
        chatInputArea.style.display = 'flex';

        const relevantMessages = allMessages.filter(msg =>
            (msg.from === currentUser && msg.to === contactUsername) ||
            (msg.from === contactUsername && msg.to === currentUser)
        );

        if (relevantMessages.length > 0) {
            relevantMessages.forEach(renderMessage);
        } else {
            chatMessages.innerHTML = `<div class="no-conversation-selected"><p>This is the beginning of your conversation with ${displayName}.</p></div>`;
        }
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
        messageInput.focus();
    }

    function renderMessage(message) {
        const messageBubble = document.createElement('div');
        messageBubble.className = `message-bubble ${message.from === currentUser ? 'sent' : 'received'}`;
        messageBubble.textContent = message.text;
        chatMessages.appendChild(messageBubble);
    }
    
    function sendMessage() {
        const text = messageInput.value.trim();
        if (text && activeConversation) {
            if (allMessages.filter(msg => (msg.from === currentUser && msg.to === activeConversation) || (msg.from === activeConversation && msg.to === currentUser)).length === 0) {
                chatMessages.innerHTML = '';
            }
            const newMessage = { from: currentUser, to: activeConversation, text: text, timestamp: new Date().toISOString() };
            allMessages.push(newMessage);
            localStorage.setItem('allMessages', JSON.stringify(allMessages));
            renderMessage(newMessage);
            messageInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;
            renderConversations(searchInput.value);
        }
    }

    function openSearchModal() {
        modalSearchInput.value = '';
        renderAllUsers();
        userSearchModal.style.display = 'flex';
        modalSearchInput.focus();
    }

    function closeSearchModal() {
        userSearchModal.style.display = 'none';
    }

    function renderAllUsers(filter = '') {
        modalUserList.innerHTML = '';
        Object.keys(userProfiles).filter(username => 
            username !== currentUser &&
            username.toLowerCase().includes(filter.toLowerCase())
        ).forEach(username => {
            const profile = userProfiles[username];
            const userItem = document.createElement('div');
            userItem.className = 'modal-user-item';
            userItem.innerHTML = `
                <img src="${profile.avatar || 'pictures/default-avatar.png'}" alt="${username}">
                <span class="modal-user-name">${username}</span>
            `;
            userItem.addEventListener('click', () => {
                selectConversation(username);
                closeSearchModal();
            });
            modalUserList.appendChild(userItem);
        });
    }

    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => e.key === 'Enter' && sendMessage());
    searchInput.addEventListener('input', (e) => renderConversations(e.target.value));
    newMessageBtn.addEventListener('click', openSearchModal);
    closeModalBtn.addEventListener('click', closeSearchModal);
    userSearchModal.addEventListener('click', (e) => {
        if (e.target === userSearchModal) closeSearchModal();
    });

    renderConversations();
});