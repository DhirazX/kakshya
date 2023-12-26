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

function uploadFile(event) {
    event.preventDefault();
    console.log("entered into upload file")
    const url = 'http://127.0.0.1:8000/api/user/class-record/create/';
    const authToken = token; // Replace with your actual token

    const title = document.querySelector('.upload-title').value;
    const classId = document.querySelector('.class-select').value;
    const fileInput = document.querySelector('.upload-section');
    const audioFile = fileInput.files[0];

    const formData = new FormData();
    formData.append('title', title);
    formData.append('class_id', classId);
    formData.append('audio_file', audioFile);

    console.log('Uploading file with data:', title, classId, audioFile);

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + authToken
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Class record created successfully") {
            // Handle successful upload
            alert("Success");
            location.reload(); 
        
        } else {
            console.log("error")
            // Handle errors
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
};


function fetchClasses() {
    console.log("entered into fetch classes")
    const url = base_url + API_ENDPOINTS.viewClassList;
    const authToken = token;

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        updateClassSelectOptions(data);
        updateClassSelectOptionsRecord(data);
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
                <div class="record-visible">
                    <div class="record-title">${classItem.title}</div>
                    <div class="record-icons">
                        <i class="fa-regular fa-pen-to-square edit-btn"></i>
                        <i class="fa-regular fa-trash-can delete-btn"></i>
                        <span class="separator">|</span>
                        <i class="fa-solid fa-chevron-down dropdown-btn"></i>
                    </div>
                </div>
                <div class="record-info hide-record-info">
                    ${classItem.description}
                    <br /><br />
                    Created at: ${classItem.created_at}
                </div>
            </div>
        `;
    });    

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

function updateClassSelectOptions(data) {
    console.log(data);
    console.log('Updating class select options with data:', data);
    const selectElement = document.querySelector('.class-select');

    const selectElementRecord = document.querySelector('.class-select-record');

    selectElement.innerHTML = '<option value="">Select class</option>'; // Clear existing options
    
    data.forEach(classItem => {
        const optionElement = document.createElement('option');
        optionElement.value = classItem.id; // Replace 'classId' with the correct property name
        optionElement.textContent = classItem.title;
        selectElement.appendChild(optionElement);
    });
}

function updateClassSelectOptionsRecord(data) {
    console.log(data);
    console.log('Updating class select options with data:', data);
    const selectElement = document.querySelector('.class-select-record');

    selectElement.innerHTML = '<option value="">Select class</option>'; // Clear existing options
    
    data.forEach(classItem => {
        const optionElement = document.createElement('option');
        optionElement.value = classItem.id; // Replace 'classId' with the correct property name
        optionElement.textContent = classItem.title;
        selectElement.appendChild(optionElement);
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

    htmlContent += '</div>';
    classesContainer.innerHTML = htmlContent;
}

