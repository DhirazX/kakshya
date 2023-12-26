document.addEventListener("DOMContentLoaded", function () {
  const recordButton = document.getElementById("recordButton");
  const saveButton = document.getElementById("saveButton");
  const timerDisplay = document.getElementById("timer");
  const uploadButton = document.getElementById("uploadButton"); // Add this button in your HTML
  const titleInput = document.getElementById("rec-title");
  const classSelect = document.getElementById("rec-id"); // Ensure this is an ID, not a class

  let mediaRecorder;
  let audioChunks = [];
  let isRecording = false;
  let startTime;
  let interval;
  let audioBlob;

  // Update Timer Function
  function updateTimer() {
    const elapsedTime = Date.now() - startTime;
    const seconds = Math.floor(elapsedTime / 1000) % 60;
    const minutes = Math.floor(elapsedTime / 60000);
    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  }

  // Start Recording Function
  function startRecording(stream) {
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    startTime = Date.now();
    interval = setInterval(updateTimer, 1000);
    audioChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      saveButton.disabled = false;
      clearInterval(interval);
      timerDisplay.textContent = "00:00";
      recordButton.textContent = "Start";
      isRecording = false;
    };

    recordButton.textContent = "Stop";
    isRecording = true;
  }

  // Record Button Event Listener

  recordButton.addEventListener("click", () => {
    if (isRecording) {
      mediaRecorder.stop();
    } else {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(startRecording)
        .catch((e) => {
          console.error("Error accessing the microphone:", e);
          alert(
            "Error accessing the microphone. Please ensure that your microphone is connected and that you have given permission to access it."
          );
        });
    }
  });

  // Save Button Event Listener for Recorded Audio

  saveButton.addEventListener("click", () => {
    if (audioBlob) {
      console.log(
        "entered into upload button",
        titleInput.value,
        classSelect.value,
        audioFile
      );

      uploadAudio(titleInput.value, classSelect.value, audioBlob);
    } else {
      alert("No recording to save!");
    }
  });

  // Upload Button Event Listener for Audio File
  uploadButton.addEventListener("click", (event) => {
    event.preventDefault();
    const fileInput = document.getElementById("fileInput"); // Add this file input in your HTML
    const audioFile = fileInput.files[0];
    if (audioFile) {
      uploadAudio(titleInput.value, classSelect.value, audioFile);
    } else {
      alert("No file selected!");
    }
  });

  // Function to upload audio
  function uploadAudio(title, classId, audio) {
    const url = "http://192.168.1.174:8000/api/user/class-record/create/";
    const formData = new FormData();
    formData.append("title", title);
    formData.append("class_id", classId);
    formData.append("audio_file", audio);

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Class record created successfully") {
          alert("Success");
          location.reload();
        } else {
          console.error("Error in uploading:", data);
        }
      })
      .catch((error) => console.log("Error:", error));
  }
});
