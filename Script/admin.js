/**
         * ==========================================================================
         * MyStrand - Admin Panel JavaScript
         * ==========================================================================
         */

        document.addEventListener('DOMContentLoaded', function() {
            // --- GATEKEEPER & LOGOUT ---
            // Note: For this demo to work without login first, you might want to comment out the access check logic below
            /*
            const loggedInUser = sessionStorage.getItem('loggedInUser');
            const userRole = sessionStorage.getItem('userRole');
            if (!loggedInUser || userRole !== 'admin') {
                alert("Access Denied. You must be an admin to view this page.");
                window.location.href = 'login.html';
                return;
            }
            */
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', () => {
                    sessionStorage.clear();
                    window.location.href = 'login.html';
                });
            }

            // --- ELEMENT SELECTORS ---
            const enrollmentsContainer = document.getElementById('enrollments-content');
            const messagesContainer = document.getElementById('messages-content');
            const composeModal = document.getElementById('compose-modal');
            const enrollmentViewerModal = document.getElementById('enrollment-viewer-modal');
            const documentViewerModal = document.getElementById('document-viewer-modal');
            
            // --- TAB SWITCHING ---
            const tabs = document.querySelectorAll('.tab-btn');
            const contents = document.querySelectorAll('.tab-content');
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    tabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    contents.forEach(c => c.style.display = 'none');
                    const activeContent = document.getElementById(tab.dataset.tab + '-content');
                    if (activeContent) activeContent.style.display = 'block';
                });
            });

            // --- RENDER FUNCTIONS ---
            function loadEnrollments() {
                if (!enrollmentsContainer) return;
                enrollmentsContainer.innerHTML = '';
                // Fake data for testing if localStorage is empty
                let enrollments = JSON.parse(localStorage.getItem('enrollments')) || [];
                
                if (enrollments.length === 0) {
                    enrollmentsContainer.innerHTML = '<p class="placeholder-text">No enrollment submissions yet.</p>';
                    return;
                }
                enrollments.slice().reverse().forEach(sub => {
                    const card = document.createElement('div');
                    card.className = 'submission-card enrollment-summary';
                    card.dataset.id = sub.id;
                    card.innerHTML = `
                        <div class="card-header"><h3>${sub.fullname}</h3><span class="timestamp">${sub.timestamp}</span></div>
                        <div class="card-body">
                            <div class="info-block"><strong>Email</strong><span>${sub.email}</span></div>
                            <div class="info-block"><strong>Strand</strong><span>${sub.strand}${sub.tvl_specialization ? ` (${sub.tvl_specialization})` : ''}</span></div>
                        </div>`;
                    enrollmentsContainer.appendChild(card);
                });
            }

            function loadMessages() {
                if (!messagesContainer) return;
                messagesContainer.innerHTML = '';
                const actionsBar = document.createElement('div');
                actionsBar.className = 'tab-actions';
                actionsBar.innerHTML = `<div class="user-search"><input type="text" id="user-search-input" placeholder="Find user by username..."><button id="compose-by-username-btn" class="admin-btn"><i class="fas fa-search"></i> Compose</button></div><button id="clear-messages-btn" class="admin-btn danger"><i class="fas fa-trash-alt"></i> Clear All Messages</button>`;
                messagesContainer.appendChild(actionsBar);
                const messageListContainer = document.createElement('div');
                messageListContainer.className = 'message-list';
                const messages = JSON.parse(localStorage.getItem('myStrandMessages')) || [];
                if (messages.length === 0) {
                    messageListContainer.innerHTML = '<p class="placeholder-text">No messages yet.</p>';
                } else {
                    messages.slice().reverse().forEach(msg => {
                        const card = document.createElement('div');
                        card.className = 'submission-card message-summary';
                        card.dataset.id = msg.id;
                        card.innerHTML = `<div class="card-header"><h3>${msg.subject}</h3><span class="timestamp">${msg.status === 'replied' ? '✅ Replied' : '📩 New'}</span></div><div class="card-body"><div class="info-block"><strong>From</strong><span>${msg.senderUsername} (${msg.senderEmail})</span></div><div class="info-block"><strong>Received</strong><span>${msg.timestamp}</span></div></div>`;
                        messageListContainer.appendChild(card);
                    });
                }
                messagesContainer.appendChild(messageListContainer);
            }
            
            function viewMessageDetail(messageId) {
                const messages = JSON.parse(localStorage.getItem('myStrandMessages')) || [];
                const msg = messages.find(m => m.id === messageId);
                if (!msg) return;

                let repliesHTML = msg.replies.map(reply => `<div class="message-bubble ${reply.author === 'admin' ? 'admin' : 'user'}"><strong>${reply.author === 'admin' ? 'Your Reply' : msg.senderUsername + '\'s Reply'}:</strong><p>${reply.message}</p><span class="timestamp">${reply.timestamp}</span></div>`).join('');
                
                messagesContainer.innerHTML = `
                    <button class="admin-btn" id="back-to-messages"><i class="fas fa-arrow-left"></i> Back to Inbox</button>
                    <div class="submission-card" style="margin-top: 1em;">
                        <div class="card-header"><h3>${msg.subject}</h3></div>
                        <div class="card-body">
                            <div class="message-bubble user"><strong>From: ${msg.senderUsername}</strong><p>${msg.initialMessage}</p><span class="timestamp">${msg.timestamp}</span></div>
                            ${repliesHTML}
                            <form id="reply-form" data-id="${messageId}">
                                <textarea id="reply-textarea" placeholder="Write your reply..." required></textarea>
                                <button type="submit" class="admin-btn">Send Reply</button>
                            </form>
                        </div>
                    </div>`;
            }

            // --- MODAL FUNCTIONS ---
            function openComposeModal(username, email) {
                if (!composeModal) return;
                document.getElementById('compose-title').textContent = `Send Message to ${username}`;
                const form = document.getElementById('compose-form');
                form.dataset.recipientUsername = username;
                form.dataset.recipientEmail = email;
                composeModal.classList.add('active');
            }
            function closeComposeModal() {
                if (composeModal) {
                    composeModal.classList.remove('active');
                    document.getElementById('compose-form').reset();
                }
            }
            
            function openEnrollmentViewer(enrollmentId) {
                if (!enrollmentViewerModal) return;
                const enrollments = JSON.parse(localStorage.getItem('enrollments')) || [];
                const sub = enrollments.find(e => e.id === enrollmentId);
                if (!sub) return;
                
                // Clean the document path (remove C:\fakepath\)
                let cleanDocName = sub.documents ? sub.documents.split('\\').pop().split('/').pop() : 'No Attachment';
                let docButton = sub.documents 
                    ? `<button class="view-doc-btn" data-doc="${cleanDocName}"><i class="fas fa-paperclip"></i> View ${cleanDocName}</button>` 
                    : '<span>None</span>';

                document.getElementById('enrollment-details-content').innerHTML = `<div class="details-grid">
                        <div class="info-block"><strong>Full Name</strong><span>${sub.fullname}</span></div>
                        <div class="info-block"><strong>Email</strong><span>${sub.email}</span></div>
                        <div class="info-block"><strong>Contact No.</strong><span>${sub.contact}</span></div>
                        <div class="info-block"><strong>Age</strong><span>${sub.age}</span></div>
                        <div class="info-block"><strong>Previous School</strong><span>${sub.school}</span></div>
                        <div class="info-block"><strong>Strand Choice</strong><span>${sub.strand}</span></div>
                        ${sub.tvl_specialization ? `<div class="info-block"><strong>TVL Specialization</strong><span>${sub.tvl_specialization}</span></div>` : ''}
                        <div class="info-block"><strong>Document File</strong>${docButton}</div>
                        <div class="info-block"><strong>Reason for Choosing</strong><span>${sub.choice_message || 'N/A'}</span></div>
                    </div>`;
                document.getElementById('enrollment-viewer-footer').innerHTML = `
                    <button class="admin-btn print-enrollment-btn" data-id="${sub.id}"><i class="fas fa-print"></i> Print Form</button>
                    <button class="admin-btn message-applicant-btn" data-username="${sub.fullname}" data-email="${sub.email}"><i class="fas fa-paper-plane"></i> Message</button>
                    <button class="admin-btn danger remove-enrollment-btn" data-id="${sub.id}"><i class="fas fa-trash-alt"></i> Remove Application</button>`;
                enrollmentViewerModal.classList.add('active');
            }
            function closeEnrollmentViewer() {
                if (enrollmentViewerModal) enrollmentViewerModal.classList.remove('active');
            }

            // --- DOCUMENT VIEWER LOGIC ---
            function openDocumentViewer(filename) {
                if (!documentViewerModal) return;
                const body = document.getElementById('document-viewer-body');
                document.getElementById('doc-viewer-filename').textContent = "Attachment: " + filename;
                
                // Determine file type based on extension
                const ext = filename.split('.').pop().toLowerCase();
                
                if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
                    // Show Image Placeholder
                    body.innerHTML = `<img src="https://via.placeholder.com/600x400?text=Image+Preview:+${filename}" style="max-width:100%; max-height:100%; object-fit:contain;">`;
                } else if (ext === 'pdf') {
                    // Show PDF Placeholder (Using W3C dummy for simulation)
                    body.innerHTML = `<iframe src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" style="width:100%; height:100%; border:none;"></iframe>`;
                } else {
                    // Generic File Type
                    body.innerHTML = `<div class="doc-placeholder"><i class="fas fa-file-alt"></i><h3>${filename}</h3><p>Preview not available for this file type.</p></div>`;
                }
                
                documentViewerModal.classList.add('active');
            }

            // --- MASTER EVENT LISTENER (Event Delegation) ---
            document.body.addEventListener('click', (e) => {
                // Enrollment Card Clicks
                if (e.target.closest('.enrollment-summary')) {
                    openEnrollmentViewer(parseInt(e.target.closest('.enrollment-summary').dataset.id));
                } else if (e.target.matches('#enrollment-viewer-close-btn') || e.target === enrollmentViewerModal) {
                    closeEnrollmentViewer();
                } else if (e.target.matches('.remove-enrollment-btn')) {
                    const enrollmentId = parseInt(e.target.dataset.id);
                    if (confirm('Are you sure you want to permanently remove this application?')) {
                        let enrollments = JSON.parse(localStorage.getItem('enrollments')) || [];
                        enrollments = enrollments.filter(sub => sub.id !== enrollmentId);
                        localStorage.setItem('enrollments', JSON.stringify(enrollments));
                        closeEnrollmentViewer();
                        loadEnrollments();
                    }
                } 
                // PRINT BUTTON CLICK
                else if (e.target.matches('.print-enrollment-btn') || e.target.closest('.print-enrollment-btn')) {
                    const btn = e.target.closest('.print-enrollment-btn') || e.target;
                    const enrollmentId = parseInt(btn.dataset.id);
                    const enrollments = JSON.parse(localStorage.getItem('enrollments')) || [];
                    const sub = enrollments.find(e => e.id === enrollmentId);
                    
                    if(sub) {
                        // --- FETCH USER AVATAR LOGIC ---
                        const users = JSON.parse(localStorage.getItem('myStrandUsers')) || [];
                        const linkedUser = users.find(u => u.email === sub.email);
                        // Default placeholder if no user match or no avatar set
                        const avatarSrc = (linkedUser && linkedUser.avatar) ? linkedUser.avatar : 'pictures/default-avatar.png';

                        const printWindow = window.open('', '_blank');
                        printWindow.document.write('<html><head><title>Enrollment Form - ' + sub.fullname + '</title>');
                        printWindow.document.write('<style>');
                        printWindow.document.write('body { font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; padding: 40px; line-height: 1.6; color: #333; max-width: 850px; margin: 0 auto; }');
                        
                        // Header Layout with Side Profile
                        printWindow.document.write('.header-container { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; border-bottom: 3px solid #0a1949; padding-bottom: 20px; }');
                        printWindow.document.write('.header-info h1 { margin: 0; color: #0a1949; font-size: 24pt; text-transform: uppercase; letter-spacing: 1px; }');
                        printWindow.document.write('.header-info p { margin: 5px 0 0; color: #555; font-size: 1.1em; }');
                        
                        // Profile Image Styling
                        printWindow.document.write('.profile-box { width: 140px; height: 140px; border: 2px solid #0a1949; border-radius: 8px; overflow: hidden; background: #f0f0f0; }');
                        printWindow.document.write('.profile-box img { width: 100%; height: 100%; object-fit: cover; }');

                        // Data Grid
                        printWindow.document.write('.info-section { display: flex; flex-direction: column; gap: 0; border: 1px solid #ddd; }');
                        printWindow.document.write('.info-row { display: flex; border-bottom: 1px solid #ddd; }');
                        printWindow.document.write('.info-row:last-child { border-bottom: none; }');
                        printWindow.document.write('.label { width: 220px; background-color: #f9f9f9; padding: 12px 15px; font-weight: bold; color: #0a1949; border-right: 1px solid #ddd; }');
                        printWindow.document.write('.value { flex: 1; padding: 12px 15px; color: #000; }');
                        
                        printWindow.document.write('</style>');
                        printWindow.document.write('</head><body>');
                        
                        // Header Structure
                        printWindow.document.write('<div class="header-container">');
                        printWindow.document.write('<div class="header-info"><h1>Enrollment Application</h1><p>MyStrand Official Document</p><p style="font-size:0.9em; color:#888;">ID: ' + sub.id + '</p></div>');
                        printWindow.document.write(`<div class="profile-box"><img src="${avatarSrc}" alt="Applicant Photo"></div>`);
                        printWindow.document.write('</div>');
                        
                        // Information Table
                        printWindow.document.write('<div class="info-section">');
                        printWindow.document.write(`<div class="info-row"><div class="label">Full Name</div><div class="value">${sub.fullname}</div></div>`);
                        printWindow.document.write(`<div class="info-row"><div class="label">Email Address</div><div class="value">${sub.email}</div></div>`);
                        printWindow.document.write(`<div class="info-row"><div class="label">Contact Number</div><div class="value">${sub.contact}</div></div>`);
                        printWindow.document.write(`<div class="info-row"><div class="label">Age</div><div class="value">${sub.age}</div></div>`);
                        printWindow.document.write(`<div class="info-row"><div class="label">Previous School</div><div class="value">${sub.school}</div></div>`);
                        printWindow.document.write(`<div class="info-row"><div class="label">Selected Strand</div><div class="value"><strong>${sub.strand}</strong></div></div>`);
                        if (sub.tvl_specialization) {
                            printWindow.document.write(`<div class="info-row"><div class="label">TVL Specialization</div><div class="value">${sub.tvl_specialization}</div></div>`);
                        }
                        printWindow.document.write(`<div class="info-row"><div class="label">Date Submitted</div><div class="value">${sub.timestamp}</div></div>`);
                        printWindow.document.write(`<div class="info-row"><div class="label">Personal Statement</div><div class="value">${sub.choice_message || 'N/A'}</div></div>`);
                        printWindow.document.write('</div>');
                        
                        printWindow.document.write('<div style="margin-top: 50px; text-align: center; font-size: 0.8em; color: #888; border-top: 1px solid #eee; padding-top: 10px;">Generated by MyStrand Admin Panel</div>');
                        
                        printWindow.document.write('</body></html>');
                        
                        printWindow.document.close();
                        printWindow.focus();
                        // Delay slightly to ensure image loads before print dialog
                        setTimeout(() => {
                            printWindow.print();
                            printWindow.close();
                        }, 500);
                    }
                }
                // VIEW DOCUMENT CLICK
                else if (e.target.closest('.view-doc-btn')) {
                    e.stopPropagation(); // Prevent bubbling issues
                    const filename = e.target.closest('.view-doc-btn').dataset.doc;
                    openDocumentViewer(filename);
                }
                else if (e.target.matches('#doc-viewer-close-btn') || e.target === documentViewerModal) {
                    documentViewerModal.classList.remove('active');
                    document.getElementById('document-viewer-body').innerHTML = ''; // Stop iframes
                }
                // Message Summary Click
                else if (e.target.closest('.message-summary')) {
                    viewMessageDetail(parseInt(e.target.closest('.message-summary').dataset.id));
                }
                // General Message Actions
                else if (e.target.matches('#back-to-messages')) {
                    loadMessages();
                } else if (e.target.matches('#compose-by-username-btn')) {
                    const usernameToFind = document.getElementById('user-search-input').value.trim();
                    if (!usernameToFind) { alert('Please enter a username to search for.'); return; }
                    const allUsers = JSON.parse(localStorage.getItem('myStrandUsers')) || [];
                    const userFound = allUsers.find(user => user.username.toLowerCase() === usernameToFind.toLowerCase());
                    if (userFound) { openComposeModal(userFound.username, userFound.email); }
                    else { alert(`User "${usernameToFind}" not found.`); }
                } else if (e.target.matches('#clear-messages-btn')) {
                    if (confirm('DANGER: This will delete ALL user messages permanently. Are you sure?')) {
                        localStorage.removeItem('myStrandMessages');
                        loadMessages();
                    }
                }
                // Message button (can be on enrollment card OR in viewer modal)
                else if (e.target.matches('.message-applicant-btn')) {
                    openComposeModal(e.target.dataset.username, e.target.dataset.email);
                }
                // Compose Modal Closing
                else if (e.target.matches('#compose-close-btn') || e.target === composeModal) {
                    closeComposeModal();
                }
            });

            // --- FORM SUBMIT LISTENERS ---
            document.body.addEventListener('submit', (e) => {
                // Reply Form Submission
                if (e.target.matches('#reply-form')) {
                    e.preventDefault();
                    const messageId = parseInt(e.target.dataset.id);
                    const replyText = e.target.querySelector('#reply-textarea').value;
                    if (!replyText.trim()) return;

                    const newReply = { author: 'admin', message: replyText, timestamp: new Date().toLocaleString() };
                    const allMessages = JSON.parse(localStorage.getItem('myStrandMessages')) || [];
                    const messageIndex = allMessages.findIndex(m => m.id === messageId);
                    if (messageIndex > -1) {
                        allMessages[messageIndex].replies.push(newReply);
                        allMessages[messageIndex].status = 'replied';
                        localStorage.setItem('myStrandMessages', JSON.stringify(allMessages));
                        viewMessageDetail(messageId);
                    }
                }
                // Compose Form Submission
                else if (e.target.matches('#compose-form')) {
                    e.preventDefault();
                    const form = e.target;
                    const messages = JSON.parse(localStorage.getItem('myStrandMessages')) || [];
                    const newMessageThread = {
                        id: Date.now(),
                        senderUsername: form.dataset.recipientUsername,
                        senderEmail: form.dataset.recipientEmail,
                        subject: form.querySelector('#compose-subject').value,
                        initialMessage: "[This conversation was initiated by an administrator.]",
                        timestamp: new Date().toLocaleString(),
                        status: "replied",
                        replies: [{ author: 'admin', message: form.querySelector('#compose-message').value, timestamp: new Date().toLocaleString() }]
                    };
                    messages.push(newMessageThread);
                    localStorage.setItem('myStrandMessages', JSON.stringify(messages));
                    alert(`Message sent successfully to ${form.dataset.recipientUsername}!`);
                    closeComposeModal();
                    document.querySelector('.tab-btn[data-tab="messages"]').click();
                }
            });

            // --- INITIAL PAGE LOAD ---
            if (enrollmentsContainer) loadEnrollments();
            if (messagesContainer) loadMessages();
        });