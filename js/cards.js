import VisitTherapist from './visit-therapist.js';
import VisitСardiologist from './visit-cardiologist.js';
import VisitDentist from './visit-dentist.js';


class Planner {

}


let cardModal = document.querySelector('.container-item__modal');
let cardTriggerBtn = document.querySelector('.container-item__header-add-card');
let cardCloseBtn = document.querySelector('.container-item__modal-close');
let cardForm = document.querySelector('.container-item__modal-form');

cardTriggerBtn.addEventListener('click', () => {
    cardModal.style.display = "block";
});
cardCloseBtn.addEventListener('click', () => {
    cardModal.style.display = "none";
    cardForm.reset();
})

window.addEventListener('click', function(event){
    console.log(event);
    if (event.target == cardModal) {
        cardModal.style.display = "none";
        cardForm.reset();
    }
})
