const recordButton = document.getElementById('recordButton');
const saveButton = document.getElementById('saveButton');
const timerDisplay = document.getElementById('timer');

let mediaRecorder;
let audioChunks = [];
let isRecording = false;
let startTime;
let interval;
let audioBlob; // Variable to hold the audio blob

// Function to update the timer display
function updateTimer() {
  const elapsedTime = Date.now() - startTime;
  const seconds = Math.floor(elapsedTime / 1000) % 60;
  const minutes = Math.floor(elapsedTime / 60000);
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Function to start recording
function startRecording(stream) {
  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.start();
  startTime = Date.now();
  interval = setInterval(updateTimer, 1000);

  mediaRecorder.ondataavailable = (event) => {
    audioChunks.push(event.data);
  };

  mediaRecorder.onstop = () => {
    audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    audioChunks = [];
    clearInterval(interval);
    timerDisplay.textContent = '00:00';
    recordButton.textContent = 'Start';
    isRecording = false;
  };

  recordButton.textContent = 'Stop';
  isRecording = true;
}

// Event listener for the record button
recordButton.addEventListener('click', () => {
  if (isRecording) {
    mediaRecorder.stop();
  } else {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(startRecording)
      .catch(e => {
        console.error(e);
        alert('Error accessing the microphone. Please ensure that your microphone is connected and that you have given permission to access it.');
      });
  }
});

// Event listener for the save button
saveButton.addEventListener('click', () => {
  if (audioBlob) {
    const formData = new FormData();
    formData.append('audioFile', audioBlob);

    fetch('YOUR_API_ENDPOINT', { // Replace with your API endpoint
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      alert('Success: ' + data.message); // Show success message
    })
    .catch(error => {
      alert('Failed to send audio: ' + error.message); // Show error message
    });
  } else {
    alert('No recording to save!');
  }
});
