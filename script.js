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
                } else if (page === 'report.html') {
                    document.getElementById('serviceReportForm').addEventListener('submit', handleReportSubmit);
                }
            })
            .catch(error => console.error('Error loading page:', error));
    }

    // Initial load
    loadPage('login.html');

    // Handle login
    function handleLogin(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Dummy check for demo purposes
        if (username === 'tech' && password === '1234') {
            loadPage('report.html');
        } else {
            alert('Invalid username or password');
        }
    }

    // Handle report form submission
    function handleReportSubmit(event) {
        event.preventDefault();

        const formData = {
            technicianName: document.getElementById('technicianName').value,
            serviceDate: document.getElementById('serviceDate').value,
            equipmentServiced: document.getElementById('equipmentServiced').value,
            issuesResolved: document.getElementById('issuesResolved').value,
        };

        console.log('Form Data Submitted:', formData);
        alert('Report submitted successfully!');
        document.getElementById('serviceReportForm').reset();
    }
});
