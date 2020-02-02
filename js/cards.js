import {VisitTherapist} from './visit-therapist.js';
import {VisitСardiologist} from './visit-cardiologist.js';
import {VisitDentist} from './visit-dentist.js';

const addCard = document.querySelector('.container-item__header-add-card');
const cardModal = document.querySelector('.container-item__modal');
const cardForm = document.querySelector('.container-item__modal-form');
const cardCloseBtn = document.querySelector('.container-item__modal-close');
const cardFormSelect = document.querySelector('.container-item__modal-form-select');
const cardPatientField = document.querySelector('.patient-info-field');

addCard.addEventListener('click', () => {
    const modalProcessing = new Modal(cardModal, cardForm, cardCloseBtn, cardFormSelect, cardPatientField);
    modalProcessing.openModal()
});


class Modal {

    constructor(modal, form, closeBtn, formSelector, patientField) {
        this.modal = modal;
        this.form = form;
        this.closeBtn = closeBtn;
        this.formSelector = formSelector;
        this.patientField = patientField;
    }

    openModal = () => {
        this.modal.style.display = "block";
        this._handleSelect();
        this._handleModalClosing(); 
        this._handleFormSubmit();
    }
    closeModal = (t, event) => {
        if (event.target == t) {
            this.modal.style.display = "none";
            this._resetModalForm();
            this._removeListeners();
        }
    }
    
    _formToJSON() {
        /**
         * TODO: Remove this method
         * transforming to JSON is NOT required
         */
        let data = {content: {}};
        for (let index = 0; index < this.form.elements.length; index++) {
            let el = this.form.elements[index]
            if (!('target' in el.dataset)) continue
            (el.dataset.target === 'general-info' ? data[el.name] = el.value : data.content[el.name] = el.value);
        }
        return data;
    }
    proceedSubmit(event) {
        event.preventDefault();
        /**
         * TODO: Refactor this method - pass data values directly to Visit Class
         * transforming to JSON is NOT required
         */

        let userData = new FormData(this.form);
        userData = Object.fromEntries(userData);
        if (userData.doctor === 'dentist') {
            let newVisit = new VisitDentist(
                userData["title"], 
                userData["current-visit-date"], 
                userData["name"], 
                userData["last-visit-date"],
                userData["desription"]);
            newVisit.init();
        }
        
        
    }
    proceedSelect = (event) => {
        this.formSelector.querySelector('option[value=""]').disabled = true;
        this.form.dataset.medicineType = event.target.value;
        
        this.patientField.innerHTML = "";
        this.patientField.append(this._createPatientInput('title', 'text', 'general-info'));
        this.patientField.append(this._createPatientInput('name', 'text', 'user-content'));
        this.patientField.append(this._createPatientInput('current-visit-date', 'date', 'user-content'));
        
        switch (event.target.value) {
            case 'therapist':
                this.patientField.append(this._createPatientInput('age', 'text', 'user-content'));
                break;
            case 'cardiologist':
                this.patientField.append(this._createPatientInput('bp', 'text', 'user-content'));
                this.patientField.append(this._createPatientInput('weight', 'text', 'user-content'));
                this.patientField.append(this._createPatientInput('heartIllness', 'text', 'user-content'));
                this.patientField.append(this._createPatientInput('age', 'text', 'user-content'));
                break;
            case 'dentist':
                this.patientField.append(this._createPatientInput('last-visit-date', 'date', 'user-content'));
                break;
            }
    }
    _createPatientInput(name, type, dataTarget) {
        let patientInput = document.createElement('input');

        patientInput.dataset.target = dataTarget;
        patientInput.setAttribute('name', name);
        patientInput.setAttribute('type', type);
        patientInput.setAttribute('placeholder', name[0].toUpperCase() + name.substring(1).toLowerCase().replace('-', ' '));
        (type === 'date' ? patientInput.value = "2020-01-01" : patientInput.value = name)
        patientInput.required= true

        return patientInput
    }

    _resetModalForm() {
        this.formSelector.querySelector('option[value=""]').disabled = false;
        this.patientField.innerHTML = "";
        this.form.dataset.medicineType ="";
        this.form.reset();
    }
    _handleFormSubmit() {
        this.proceedSubmit = this.proceedSubmit.bind(this);
        this.form.addEventListener('submit', this.proceedSubmit);
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
        this.form.removeEventListener('submit', this.proceedSubmit);
        this.formSelector.removeEventListener('change', this.proceedSelect);
        this.closeBtn.removeEventListener('click', this.closeModalButton);
        window.removeEventListener('click', this.closeModalWindow);
    }
}

