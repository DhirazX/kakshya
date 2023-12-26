function loginuser(event){
    event.preventDefault();

    var formData = new FormData(event.target);

    fetch('http://127.0.0.1:8000/api/user/login/', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // Save the token in local storage for future use
            localStorage.setItem('token', data.token.access);
            // Redirect to the dashboard page
            window.location.href = 'dashboard.html';
        } else {
            document.getElementById('response').innerText = data.msg;

            // Handle login failure
            console.error('Login failed');
        }

    })
    .catch(error => console.error('Error:', error));
}

function registeruser(event){

    event.preventDefault();

    var formData = new FormData(event.target);

    fetch('http://127.0.0.1:8000/api/user/register/', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        
        document.getElementById('response').innerText = data.msg;
    })
    .catch(error => console.error('Error:', error));
}

function logoutUser() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}
