document.addEventListener('DOMContentLoaded', function() {
    const appDiv = document.getElementById('app');

    // Function to load HTML content into the app div
    function loadPage(page) {
        fetch(page)
            .then(response => response.text())
            .then(html => {
                appDiv.innerHTML = html;

                if (page === 'login.html') {
                    document.getElementById('loginForm').addEventListener('submit', handleLogin);
                } else if (page === 'register.html') {
                    document.getElementById('registerForm').addEventListener('submit', handleRegister);
                } else if (page === 'main.html') {
                    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
                }
            })
            .catch(error => console.error('Error loading page:', error));
    }

    // Initial load
    loadPage('login.html');

    // Dummy variable to simulate admin status (replace with actual logic)
    let isAdmin = false;

    // Handle login
    function handleLogin(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Dummy check for demo purposes
        if (username === 'admin' && password === 'admin') {
            isAdmin = true;
        }

        // Redirect to main page after login
        loadPage('main.html');
    }

    // Handle registration (only accessible if isAdmin is true)
    function handleRegister(event) {
        event.preventDefault();

        if (!isAdmin) {
            alert('Only admins can create new accounts.');
            return;
        }

        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const formData = {
            fullname,
            email,
            username,
            password
        };

        // Replace with actual API endpoint and fetch call
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                alert('Account created successfully!');
                loadPage('login.html'); // Redirect to login page after registration
            } else {
                alert('Failed to create account');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to create account');
        });
    }

    // Handle logout
    function handleLogout(event) {
        event.preventDefault();

        // Perform logout actions (e.g., clear session, redirect to login page)
        isAdmin = false;
        loadPage('login.html');
    }
});
