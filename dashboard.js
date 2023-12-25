//dashboard animaion
const records = document.querySelectorAll(".record");
setTimeout(() => {
  records.forEach((record) => {
    record.classList.add("show-section");
  });
}, 300);

records.forEach((record, index) => {
  record.style.transitionDelay = 0.1 * index + "s";
});

//for Record modal
const openModal = document.querySelector(".create-btn");
const closeModal = document.querySelector(".close-modal");
const recordModal = document.querySelector(".record-modal");

openModal.addEventListener("click", () => {
  recordModal.showModal();
});
closeModal.addEventListener("click", () => {
  recordModal.close();
});

//For Upload Modal
const openUploadModal = document.querySelector(".add-btn");
const closeUploadModal = document.querySelector(".upload-cancel");
const uploadModal = document.querySelector(".upload-modal");

openUploadModal.addEventListener("click", () => {
  uploadModal.showModal();
});
closeUploadModal.addEventListener("click", () => {
  uploadModal.close();
});

//Recorder
const recordBtn = document.querySelector(".record-btn");
recordBtn.addEventListener("click", () => {
  if (recordBtn.innerText == "Start") {
    recordBtn.innerText = "Stop";
  } else {
    recordBtn.innerText = "Start";
  }
});

// Delete Modal
const deletebtns = document.querySelectorAll(".delete-btn");
const cancelDeletebtns = document.querySelectorAll(".cancel-delete");
const deleteModal = document.querySelector(".delete-modal");

deletebtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    deleteModal.showModal();
  });
});
cancelDeletebtns.forEach((cancelbtn) => {
  cancelbtn.addEventListener("click", () => {
    deleteModal.close();
  });
});

// Record Info Dropdown
const recordInfo = document.querySelectorAll(".record-info");
const dropdownBtn = document.querySelectorAll(".dropdown-btn");
const recordTitle = document.querySelectorAll(".record-title");

dropdownBtn.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("rotate");
    recordInfo[index].classList.toggle("show-record-info");
    recordTitle[index].classList.toggle("theme-color");
    recordTitle[index].classList.toggle("bigger-font");
  });
});
