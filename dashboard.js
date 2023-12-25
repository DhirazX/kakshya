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

//for Create modal
const openModal = document.querySelector(".create-btn");
const closeModal = document.querySelector(".close-modal");
const modal = document.querySelector(".create-modal");

openModal.addEventListener("click", () => {
  modal.showModal();
});
closeModal.addEventListener("click", () => {
  modal.close();
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
const deletemodal = document.querySelector(".delete-modal");

deletebtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    deletemodal.showModal();
  });
});
cancelDeletebtns.forEach((cancelbtn) => {
  cancelbtn.addEventListener("click", () => {
    deletemodal.close();
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
