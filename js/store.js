const modal = document.getElementById('modal');
const openButton = document.getElementById("open-store");

openButton.addEventListener('click', function(event) {
  event.preventDefault();
  modal.classList.add("is-open");
  const closeButtons = document.getElementsByClassName("js-modal-close");
  for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].onclick = function() {
      event.preventDefault();
      modal.classList.remove("is-open");
    };
  }
});
