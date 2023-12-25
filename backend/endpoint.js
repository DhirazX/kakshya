var base_url = 'http://127.0.0.1:8000/api/user';

const API_ENDPOINTS = {
    register: '/register/',
    login: '/login/',
    profile: '/profile/',
    changePassword: '/change-password/',
    tokenRefresh: '/token/refresh/',
    createClass: '/class/create/',
    viewClassList: '/class/list/',
    deleteClass: '/class/delete/',//need to pass id here
    createClassRecord: '/class-record/create/',
    viewClassRecordList: '/class-record/list/',
    viewClassRecord: '/class-record/', //need to pass id here
    updateClassRecord: '/class-record/update/', //need to pass id here
    deleteClassRecord: '/class-record/delete/', //need to pass id here
};
const token = localStorage.getItem("token");

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('createClassForm').addEventListener('submit', handleFormSubmit);
});

function handleFormSubmit(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    createClass(title, description);
}

function createClass(title, description) {
    const url = 'http://127.0.0.1:8000/api/user/class/create/';
    const authToken = token; // Replace with your actual token

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        },
        body: JSON.stringify({
            title: title,
            description: description
        })
    })
    .then(response => response.json())
    .then(data => {
        // Here you can add logic to update the UI after class creation
        console.log('Success:', data);
        location.reload();
    }).catch(error => {
        console.error('Error:', error);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    fetchClasses();
    fetchSummary()
});

function fetchClasses() {
    console.log("entered into fetch classes")
    const url = 'http://127.0.0.1:8000/api/user/class/list/';
    const authToken = token; // Replace with your actual token

    fetch(url, {
        method: 'GET', // Changed to GET request
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        updateClassesList(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function updateClassesList(data) {
    console.log('Updating classes list with data:', data);

    const classesContainer = document.getElementById('classesList');
    
    // Check if the data has classes
    if (data.length === 0) {
        classesContainer.innerHTML = '<div>No classes available</div>';
        return;
    }

    let htmlContent = '<div class="recordings">';
    
    data.forEach(classItem => {
        htmlContent += `
            <div class="record">
                <div class="record-title" style="color: white;">${classItem.title}</div>
                <div class="record-description" style="color: white;">Description = ${classItem.description}  </div>
                <div class="record-timestamp" style="color: white;"> Created at: ${classItem.created_at}</div>
            </div>
        `;
    });
    console.log('Generated HTML:', htmlContent);

    htmlContent += '</div>';
    classesContainer.innerHTML = htmlContent;
}



function fetchSummary() {
    console.log("entered into fetch summary")
    const url = 'http://127.0.0.1:8000/api/user/class-record/list/';
    const authToken = token; // Replace with your actual token

    fetch(url, {
        method: 'GET', // Changed to GET request
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        updateSummaryList(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function updateSummaryList(data) {
    console.log('Updating classes list with data:', data);

    const classesContainer = document.getElementById('recordingList');
    
    // Check if the data has classes
    if (data.length === 0) {
        classesContainer.innerHTML = '<div>No recording summary available</div>';
        return;
    }

    let htmlContent = '<div class="recordings">';
    
    data.forEach(classItem => {
        htmlContent += `
            <div class="record">
                <div class="record-title" style="color: white;">${classItem.title}</div>
                <div class="record-description" style="color: white;">Description = ${classItem.description}  </div>
                <div class="record-timestamp" style="color: white;"> Created at: ${classItem.created_at}</div>
            </div>
        `;
    });
    console.log('Generated HTML:', htmlContent);

    htmlContent += '</div>';
    classesContainer.innerHTML = htmlContent;
}

