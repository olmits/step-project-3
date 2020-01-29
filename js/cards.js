import VisitTherapist from './visit-therapist.js';
import VisitСardiologist from './visit-cardiologist.js';
import VisitDentist from './visit-dentist.js';


class Planner {

}

class Modal {

    openModal = () => this.cardModal.style.display = "block";
    closeModal = (targetElement, event) => {
        if (event.target == targetElement) {
            this.cardModal.style.display = "none";
            this.cardForm.reset();
        }
    }
    cardModal = document.querySelector('.container-item__modal');
    cardTriggerBtn = document.querySelector('.container-item__header-add-card');
    cardCloseBtn = document.querySelector('.container-item__modal-close');
    cardForm = document.querySelector('.container-item__modal-form');

    constructor(){
        this.eventsListening();
    }
    eventsListening = function() {
        this.cardTriggerBtn.addEventListener('click', this.openModal.bind(this));
        this.cardCloseBtn.addEventListener('click', this.closeModal.bind(this, this.cardCloseBtn));
        window.addEventListener('click', this.closeModal.bind(this, this.cardModal));
    }
}

let modalProcessing = new Modal();