import VisitTherapist from './visit-therapist.js';
import VisitСardiologist from './visit-cardiologist.js';
import VisitDentist from './visit-dentist.js';

const addCard = document.querySelector('.container-item__header-add-card');

const cardModal = document.querySelector('.container-item__modal');
const cardForm = cardModal.querySelector('.container-item__modal-form');
const cardCloseBtn = cardModal.querySelector('.container-item__modal-close');
const cardFormSelect = cardForm.querySelector('.container-item__modal-form-select');

addCard.addEventListener('click', () => {
    const modalProcessing = new Modal(cardModal, cardForm, cardCloseBtn, cardFormSelect);
    modalProcessing.openModal()
});


class Modal {

    constructor(modal, form, closeBtn, formSelector) {
        this.modal = modal;
        this.form = form;
        this.closeBtn = closeBtn;
        this.formSelector = formSelector;
    }

    openModal = () => {
        this.modal.style.display = "block";
        this._handleSelect();
        this._handleModalClosing(); 
    }
    closeModal = (t, event) => {
        if (event.target == t) {
            this.modal.style.display = "none";
            this.form.dataset.medicineType =""
            this.form.reset();
            this._removeListeners();
        }
    }
    proceedSelect = (event) => {
        this.submitBtn = document.createElement('button');
        this.submitBtn.classList.add('container-item__modal-form-submit');
        this.submitBtn.setAttribute('type', 'submit');
        
        event.target.querySelector('option[value=""]').setAttribute('disabled', 'disabled');
        this.form.dataset.medicineType = event.target.value;
        
        this.patientField = this.form.querySelector('.patient-info-field')
        this.patientField.innerHTML = "";
        this.patientField.append(this._createPatientInput('purpose', 'text', 'container-item__modal-form-purpose'))

        switch (event.target.value) {
            case 'therapist':

                this.patientField.append(this._createPatientInput('age', 'number', 'container-item__modal-form-age'))
                break;
            case 'cardiologist':
                this.patientField.append(this._createPatientInput('name', 'text', 'container-item__modal-form-name'))
                break;
            case 'dentist':
                this.patientField.append(this._createPatientInput('last-visit', 'date', 'container-item__modal-form-date'))
                break;
        }
    }
    _createPatientInput(name, type, className) {
        let patientInput = document.createElement('input');
        patientInput.className = className
        patientInput.setAttribute('name', name);
        patientInput.setAttribute('type', type);
        patientInput.setAttribute('placeholder', name.toUpperCase());
        patientInput.setAttribute('required', 'required');

        return patientInput
    }

    _handleModalClosing() {
        this.closeModalButton = this.closeModal.bind(this, this.closeBtn)
        this.closeBtn.addEventListener('click', this.closeModalButton);

        this.closeModalWindow = this.closeModal.bind(this, this.modal)
        window.addEventListener('click', this.closeModalWindow);
    }
    _handleSelect() {
        this.proceedSelect = this.proceedSelect.bind(this);
        this.formSelector.addEventListener('change', this.proceedSelect);
    }
    _removeListeners() {
        this.formSelector.removeEventListener('change', this.proceedSelect);
        this.closeBtn.removeEventListener('click', this.closeModalButton);
        window.removeEventListener('click', this.closeModalWindow);
    }
}

