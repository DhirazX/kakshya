const API_ENDPOINTS = require('./endpoints');
const { post } = require('./network');

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameField = document.getElementById('username');
    const passwordField = document.getElementById('password');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = usernameField.value;
        const password = passwordField.value;

        try {
            const response = await post(API_ENDPOINTS.login, { username, password });

            if (response.token) {
                localStorage.setItem('accessToken', response.token.access);
                localStorage.setItem('refreshToken', response.token.refresh);
                window.location.href = '/'; // Redirect to home page after successful login
            } else {
                // Handle login failure
                alert('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});