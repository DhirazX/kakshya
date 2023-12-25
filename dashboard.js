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

//for modal
const openModal = document.querySelector(".create-btn");
const closeModal = document.querySelector(".close-modal");
const modal = document.querySelector(".modal");

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
