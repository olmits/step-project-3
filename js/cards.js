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
        this.patientField = this.form.querySelector('.patient-info-field');
        this.submitBtn = this.form.querySelector('.container-item__modal-form-submit')
    }

    openModal = () => {
        this.modal.style.display = "block";
        this._handleSelect();
        this._handleModalClosing(); 
    }
    closeModal = (t, event) => {
        if (event.target == t) {
            this.modal.style.display = "none";
            this._resetModalForm();
            this._removeListeners();
        }
    }

    proceedSubmit() {
        this.submitBtn.addEventListener('click',)
    }
    proceedSelect = (event) => {
        this.formSelector.querySelector('option[value=""]').disabled = true;
        this.form.dataset.medicineType = event.target.value;
        
        this.patientField.innerHTML = "";
        this.patientField.append(this._createPatientInput('patient-name', 'text', 'container-item__modal-form-name'));
        this.patientField.append(this._createPatientInput('visit-purpose', 'text', 'container-item__modal-form-purpose'));

        switch (event.target.value) {
            case 'therapist':
                this.patientField.append(this._createPatientInput('patient-age', 'number', 'container-item__modal-form-age'));
                break;
            case 'cardiologist':
                this.patientField.append(this._createPatientInput('blood-pressure', 'text', 'container-item__modal-form-bp'));
                this.patientField.append(this._createPatientInput('body-mass-index', 'text', 'container-item__modal-form-bmi'));
                this.patientField.append(this._createPatientInput('past-medical-history', 'text', 'container-item__modal-form-pmh'));
                this.patientField.append(this._createPatientInput('patient-age', 'number', 'container-item__modal-form-age'));
                break;
            case 'dentist':
                this.patientField.append(this._createPatientInput('last-visit', 'date', 'container-item__modal-form-date'));
                break;
        }
    }
    _createPatientInput(name, type, className) {
        let patientInput = document.createElement('input');

        patientInput.className = className
        patientInput.setAttribute('name', name);
        patientInput.setAttribute('type', type);
        patientInput.setAttribute('placeholder', name[0].toUpperCase() + name.substring(1).toLowerCase().replace('-', ' '));
        patientInput.required= true

        return patientInput
    }

    _resetModalForm() {
        this.formSelector.querySelector('option[value=""]').disabled = false;
        this.patientField.innerHTML = "";
        this.form.dataset.medicineType ="";
        this.form.reset();
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

