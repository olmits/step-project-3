import VisitTherapist from './visit-therapist.js';
import VisitСardiologist from './visit-cardiologist.js';
import VisitDentist from './visit-dentist.js';


class Planner {

}

class Modal {
    
    cardTriggerBtn = document.querySelector('.container-item__header-add-card');
    cardModal = document.querySelector('.container-item__modal');
    cardForm = this.cardModal.querySelector('.container-item__modal-form');
    cardCloseBtn = this.cardModal.querySelector('.container-item__modal-close');
    cardFormSelect = this.cardForm.querySelector('.container-item__modal-form-select');

    constructor(){
        this._handleModalOpening();
    }
    openModal = () => {
        this.cardModal.style.display = "block";
        this._handleSelect();
        this._handleModalClosing(); 
    }
    closeModal = (t, event) => {
        console.log(t, event);
        if (event.target == t) {
            this.cardModal.style.display = "none";
            this.cardForm.reset();
            this._removeListeners();
        }
    }
    proceedSelect = (event) => {
        console.log(event.target.value);
    }
    _handleModalOpening() {
        this.cardTriggerBtn.addEventListener('click', this.openModal.bind(this));
    }
    _handleModalClosing() {
        
        this.closeModalButton = this.closeModal.bind(this, this.cardCloseBtn)
        this.cardCloseBtn.addEventListener('click', this.closeModalButton);

        this.closeModalWindow = this.closeModal.bind(this, this.cardModal)
        window.addEventListener('click', this.closeModalWindow);
    }
    _handleSelect() {

        this.proceedSelect = this.proceedSelect.bind(this);
        this.cardFormSelect.addEventListener('change', this.proceedSelect);
    }
    _removeListeners() {

        this.cardFormSelect.removeEventListener('change', this.proceedSelect);
        this.cardCloseBtn.removeEventListener('click', this.closeModalButton);
        window.removeEventListener('click', this.closeModalWindow);
    }
}

let modalProcessing = new Modal();

