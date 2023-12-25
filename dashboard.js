//dashboard animaion
var records = document.querySelectorAll(".record");
setTimeout(() => {
  records.forEach((record) => {
    record.classList.add("show-section");
  });
}, 300);

records.forEach((record, index) => {
  record.style.transitionDelay = 0.15 * index + "s";
});
