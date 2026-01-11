// This file acts as our simple, shared database.

// 1. All user accounts that can log in.
function getInitialAccounts() {
    return {
        "Student": "123", // Your main user
        "Alice Smith": "alice123",
        "Bob Johnson": "bob123",
        "Mr. Reyes": "reyes123"
    };
}

// 2. All user profiles.
function getInitialProfiles() {
    return {
        "Student": {
            fullname: 'John Doe',
            email: 'student@email.com',
            phone: '123-456-7890',
            strand: 'STEM',
            avatar: 'pictures/default-avatar.png'
        },
        "Alice Smith": {
            fullname: 'Alice Smith',
            email: 'alice@email.com',
            phone: 'N/A',
            strand: 'STEM',
            avatar: 'pictures/alice-avatar.png'
        },
        "Bob Johnson": {
            fullname: 'Bob Johnson',
            email: 'bob@email.com',
            phone: 'N/A',
            strand: 'ABM',
            avatar: 'pictures/default-avatar.png'
        },
        "Mr. Reyes": {
            fullname: 'Carlos Reyes',
            email: 'creyes@teacher.com',
            phone: 'N/A',
            strand: 'Faculty',
            avatar: 'pictures/teacher-avatar.png'
        }
    };
}

// 3. The central message history for everyone.
function getInitialMessages() {
    return [
        {
            from: "Admissions Office",
            to: "Student",
            text: "Welcome to MyStrand! Your application has been received.",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
        },
        {
            from: "Alice Smith",
            to: "Student",
            text: "Hey! Are you also enrolling in STEM?",
            timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString()
        },
        {
            from: "Student",
            to: "Alice Smith",
            text: "Yes! I'm really excited about the robotics specialization.",
            timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString()
        }
    ];
}

// This function initializes the database in localStorage if it doesn't already exist.
function initializeDatabase() {
    if (!localStorage.getItem('userAccounts')) {
        localStorage.setItem('userAccounts', JSON.stringify(getInitialAccounts()));
    }
    if (!localStorage.getItem('userProfiles')) {
        localStorage.setItem('userProfiles', JSON.stringify(getInitialProfiles()));
    }
    if (!localStorage.getItem('allMessages')) {
        localStorage.setItem('allMessages', JSON.stringify(getInitialMessages()));
    }
}

// Run the initialization
initializeDatabase();