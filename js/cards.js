import {VisitTherapist} from './visit-therapist.js';
import {VisitСardiologist} from './visit-cardiologist.js';
import {VisitDentist} from './visit-dentist.js';
import {Draggable} from "./drag-drop-object.js";
import {Modal, sheduleItems, emptyState} from "./shedule-component.js";

const addCard = document.querySelector('.container-item__header-add-card');
const cardModal = document.querySelector('.container-item__modal');
const cardForm = document.querySelector('.container-item__modal-form');
const cardCloseBtn = document.querySelector('.container-item__modal-close');
const cardFormSelect = document.querySelector('.container-item__modal-form-select');
const cardPatientField = document.querySelector('.patient-info-field');
const mainContainer = document.querySelector('.container-item__board-space');

addCard.addEventListener('click', () => {
    const modalProcessing = new CardForm(cardModal, cardForm, cardCloseBtn, cardFormSelect, cardPatientField);
    modalProcessing.openModal()
});


class CardForm extends Modal {

    newVisit = null;

    constructor(modal, form, closeBtn, formSelector, patientField) {
        super(modal, closeBtn)
        this._form = form;
        this._formSelector = formSelector;
        this._patientField = patientField;
    }

    openModal = () => {
        super.openModal();
        this._handleSelect();
        this._handleFormSubmit();
    }
    _closeModalFunction() {
        super._closeModalFunction();
        this._resetModalForm();
    }
    
    async proceedSubmit(event) {
        event.preventDefault();

        let userData = new FormData(this._form);
        userData = Object.fromEntries(userData);
        if (userData.doctor === 'dentist') {
            this.newVisit = new VisitDentist(
                userData["title"], 
                userData["current-visit-date"], 
                userData["name"], 
                userData["last-visit-date"],
                userData["desription"])
        } else if (userData.doctor === 'therapist') {
            this.newVisit = new VisitTherapist(
                userData["title"], 
                userData["current-visit-date"], 
                userData["name"], 
                userData["age"],
                userData["desription"])
        } else if (userData.doctor === 'cardiologist') {
            this.newVisit = new VisitСardiologist(
                userData["title"], 
                userData["current-visit-date"], 
                userData["name"], 
                userData["bp"],
                userData["age"],
                userData["weight"],
                userData["heartIllness"],
                userData["desription"]
            )
        }
        await this.newVisit.init();
        
        emptyState.style.display = 'none';

        const cardContainer = new Draggable(this.newVisit);
        cardContainer.appendTo(mainContainer);
        // TODO: Check if response is NULL and throw an error
        sheduleItems.push({item: this.newVisit, container: cardContainer});

        this._closeModalFunction();
    };
    proceedSelect = (event) => {
        this._formSelector.querySelector('option[value=""]').disabled = true;
        this._form.dataset.medicineType = event.target.value;
        
        this._patientField.innerHTML = "";
        this._patientField.append(this._createPatientInput('title', 'text', 'general-info'));
        this._patientField.append(this._createPatientInput('name', 'text', 'user-content'));
        this._patientField.append(this._createPatientInput('current-visit-date', 'date', 'user-content'));
        
        switch (event.target.value) {
            case 'therapist':
                this._patientField.append(this._createPatientInput('age', 'text', 'user-content'));
                break;
            case 'cardiologist':
                this._patientField.append(this._createPatientInput('bp', 'text', 'user-content'));
                this._patientField.append(this._createPatientInput('weight', 'text', 'user-content'));
                this._patientField.append(this._createPatientInput('heartIllness', 'text', 'user-content'));
                this._patientField.append(this._createPatientInput('age', 'text', 'user-content'));
                break;
            case 'dentist':
                this._patientField.append(this._createPatientInput('last-visit-date', 'date', 'user-content'));
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
        this._formSelector.querySelector('option[value=""]').disabled = false;
        this._patientField.innerHTML = "";
        this._form.dataset.medicineType ="";
        this._form.reset();
    }
    _handleFormSubmit() {
        this.proceedSubmit = this.proceedSubmit.bind(this);
        this._form.addEventListener('submit', this.proceedSubmit);
    }
    _handleSelect() {
        this.proceedSelect = this.proceedSelect.bind(this);
        this._formSelector.addEventListener('change', this.proceedSelect);
    }
    _removeListeners() {
        super._removeListeners()
        this._form.removeEventListener('submit', this.proceedSubmit);
        this._formSelector.removeEventListener('change', this.proceedSelect);
    }
}

