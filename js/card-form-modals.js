import {VisitTherapist} from './visit-therapist.js';
import {VisitСardiologist} from './visit-cardiologist.js';
import {VisitDentist} from './visit-dentist.js';
import {Draggable} from "./drag-drop-object.js";
import {sheduleItems, mainContainer, Modal} from "./shedule-component.js";

const modalWindow = document.querySelector('.container-item__modal');
const modalCloseBtn = document.querySelector('.container-item__modal-close');
const modalForm = document.querySelector('.container-item__modal-form');

const addCard = document.querySelector('.container-item__header-add-card');
const addCardFormSelect = document.querySelector('.container-item__modal-form-select');

addCard.addEventListener('click', () => {
    const modalProcessing = new CardForm(modalWindow, modalForm, modalCloseBtn, addCardFormSelect);
    modalProcessing.openModal()
});


class CardForm extends Modal {

    newVisit = null;

    constructor(modal, form, closeBtn, formSelector) {
        super(modal, form, closeBtn)
        this._formSelector = formSelector;
        this._patientField = this._form.querySelector('.patient-info-field');
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
        super.proceedSubmit(event);

        const userData = Object.fromEntries(this._formData);
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
        
        const cardContainer = new Draggable(this.newVisit);
        cardContainer.appendTo(mainContainer);
        sheduleItems.push({item: this.newVisit, container: cardContainer});

        this._closeModalFunction();
    };
    proceedSelect = (event) => {
        this._formSelector.querySelector('option[value=""]').disabled = true;
        this._form.dataset.medicineType = event.target.value;

        
        this._patientField.innerHTML = "";
        this._patientField.append(this._createPatientInput('title', 'text', 'general-info'));
        this._patientField.append(this._createPatientInput('name', 'text', 'user-content'));
        this._patientField.append(this._createPatientInput('current-visit-date', 'date', 'user-content', "2020-01-01"));
        
        switch (event.target.value) {
            case 'therapist':
                this._patientField.append(this._createPatientInput('age', 'number', 'user-content'));
                break;
            case 'cardiologist':
                this._patientField.append(this._createPatientInput('bp', 'number', 'user-content'));
                this._patientField.append(this._createPatientInput('weight', 'number', 'user-content'));
                this._patientField.append(this._createPatientInput('heartIllness', 'text', 'user-content'));
                this._patientField.append(this._createPatientInput('age', 'number', 'user-content'));
                break;
            case 'dentist':
                this._patientField.append(this._createPatientInput('last-visit-date', 'date', 'user-content', "2020-01-01"));
                break;
            }
    }

    _resetModalForm() {
        this._formSelector.querySelector('option[value=""]').disabled = false;
        this._patientField.innerHTML = "";
        this._form.dataset.medicineType ="";
        this._form.reset();
    }
    _handleSelect() {
        this.proceedSelect = this.proceedSelect.bind(this);
        this._formSelector.addEventListener('change', this.proceedSelect);
    }
    _removeListeners() {
        super._removeListeners()
        this._formSelector.removeEventListener('change', this.proceedSelect);
    }
}

export class ShowMore  extends Modal {

    constructor(requestActionWithCards, cardData, modal = modalWindow, form = modalForm, closeBtn = modalCloseBtn) {
        super(modal, form, closeBtn);
        this._cardData = cardData;
        this._cardId = cardData.id;
        this._patientField = this._form.querySelector('.patient-info-field');
        this._requestActionWithCards = requestActionWithCards;
    }
    openModal(){
        super.openModal();
        this._renderDataInCard(this._cardData);
        this._handleFormSubmit();
    }
    _renderDataInCard(cardData) {
        
        this._doctorSelected = document.querySelector('.container-item__modal-form-select');
        this._doctorSelected.value = cardData.doctor;
        this._doctorSelected.disabled = true;
        
        this._patientField = document.querySelector('.patient-info-field');
        this._patientField.innerHTML = "";
        this._patientField.append(this._createPatientInput('doctor', 'text', 'hidden-info', cardData.doctor));
        this._patientField.append(this._createPatientInput('title', 'text', 'general-info', cardData.title));
        this._patientField.append(this._createPatientInput('name', 'text', 'user-content', cardData.content.name));
        this._patientField.append(this._createPatientInput('current-visit-date', 'date', 'user-content', cardData.content.date));
        switch (cardData.doctor) {
            case 'therapist':
                this._patientField.append(this._createPatientInput('age', 'text', 'user-content', cardData.content.age));
                break;
            case 'cardiologist':
                this._patientField.append(this._createPatientInput('bp', 'text', 'user-content', cardData.content.bp));
                this._patientField.append(this._createPatientInput('weight', 'text', 'user-content', cardData.content.weight));
                this._patientField.append(this._createPatientInput('heartIllness', 'text', 'user-content', cardData.content.heartIllness));
                this._patientField.append(this._createPatientInput('age', 'text', 'user-content', cardData.content.age));
                break;
            case 'dentist':
                this._patientField.append(this._createPatientInput('last-visit-date', 'date', 'user-content', cardData.content.dateOfLastVisit));
                break;
        }
    }
    async proceedSubmit(event) {
        super.proceedSubmit(event);

        const userData = Object.fromEntries(this._formData);
        let submitData = {
            doctor: userData.doctor,
            title: userData.title,
            content: {
                name: userData.name,
                date: userData['current-visit-date'],
            }
        }
        switch (userData.doctor) {
            case 'cardiologist':
                submitData.content.bp = userData.bp
                submitData.content.weight = userData.weight
                submitData.content.age = userData.age
                submitData.content.heartIllness = userData.heartIllness
                break;
            case 'dentist':
                submitData.content.dateOfLastVisit = userData['last-visit-date'];
                break;
            case 'therapist':
                submitData.content.age = userData.age
                break;
            default:
                alert('Sorry, this card is broken');
        }
        
        if (submitData.content.name !== this._cardData.content.name) {
            const cardLayout = document.getElementById(this._cardId);
            const cardUserName = cardLayout.querySelector('.card-item_visitor-name');
            cardUserName.innerText = submitData.content.name;
        }

        await this._requestActionWithCards.updateCard(submitData, this._cardId);
        this._closeModalFunction();
    }
    _resetModalForm() {
        this._doctorSelected.disabled = false;
        this._patientField.innerHTML = "";
        this._form.dataset.medicineType ="";
        this._form.reset();
    }
 }
