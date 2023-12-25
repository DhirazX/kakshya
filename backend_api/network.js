const API_ENDPOINTS = require('./endpoints');

async function fetchWithToken(endpoint, options) {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        window.location.href = API_ENDPOINTS.login;
        return;
    }

    options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
    };

    const response = await fetch(API_ENDPOINTS[endpoint], options);

    if (response.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken');
        const newToken = await refreshAccessToken(refreshToken);

        if (newToken) {
            localStorage.setItem('accessToken', newToken);
            options.headers['Authorization'] = `Bearer ${newToken}`;
            return fetch(API_ENDPOINTS[endpoint], options);
        } else {
            window.location.href = API_ENDPOINTS.login;
            return;
        }
    }

    return response;
}

async function refreshAccessToken(refreshToken) {
    const response = await fetch(API_ENDPOINTS.tokenRefresh, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken })
    });

    if (response.ok) {
        const data = await response.json();
        return data.token.access;
    }

    return null;
}

async function post(endpoint, body) {
    const response = await fetchWithToken(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    }

    throw new Error(`Request failed: ${response.status}`);
}