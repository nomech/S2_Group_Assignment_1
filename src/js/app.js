import Ui from "./Ui.js";

// Selecting buttons
const navButtons = document.querySelectorAll('.nav-button');

// DOMContentLoaded to initialize panel
document.addEventListener("DOMContentLoaded", () => {
    // Adding event listeners
navButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      const buttonId = event.target.dataset.id;
      Ui.renderPage(buttonId);
      openFormOnClick(buttonId);
    });
  });

  const openFormOnClick = (id) =>{
    const panel = document.querySelector(".panel__add");

    const form = document.querySelector(`.form-modal__${id}`);
    console.log(form);
    
      // Adding event listener to panel button
    panel.addEventListener("click", (e) => {
  
    const panel = document.querySelector(".panel__add");
    Ui.openForm(form, id);
  });

  const close = document.querySelectorAll(".form-modal__close");
  close.forEach(button =>{
    
    button.addEventListener("click", (e) => {
        
        Ui.closeForm(form, id);
    });

  })
  }

});





