import {VisitTherapist} from './visit-therapist.js';
import {VisitСardiologist} from './visit-cardiologist.js';
import {VisitDentist} from './visit-dentist.js';
import {Draggable} from "./drag-drop-object.js";
import {sheduleItems, mainContainer, emptyState, Modal} from "./shedule-component.js";

// export const showMoreModal = document.getElementById("showMoreModal");
// export const showMoreCloseBtn = document.querySelector(".modal-close");
export const showMoreModal = document.querySelector('.container-item__modal');
export const showMoreCloseBtn = document.querySelector('.container-item__modal-close');
export const showMoreForm = document.querySelector('.container-item__modal-form');




const addCard = document.querySelector('.container-item__header-add-card');

const addCardModal = document.querySelector('.container-item__modal');
const addCardForm = document.querySelector('.container-item__modal-form');
const addCardCloseBtn = document.querySelector('.container-item__modal-close');
const addCardFormSelect = document.querySelector('.container-item__modal-form-select');

addCard.addEventListener('click', () => {
    const modalProcessing = new CardForm(addCardModal, addCardForm, addCardCloseBtn, addCardFormSelect);
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
        this._patientField.append(this._createPatientInput('current-visit-date', 'date', 'user-content', "2020-01-01"));
        
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

export class ShowMore  extends Modal {

    constructor(requestActionWithCards, cardData, modal = showMoreModal, form = showMoreForm, closeBtn = showMoreCloseBtn) {
        super(modal, form, closeBtn);
        this._cardData = cardData;
        this._patientField = this._form.querySelector('.patient-info-field');
        this._requestActionWithCards = requestActionWithCards;
        
        this._updateDataInCard();
    }
    openModal(){
        super.openModal();
        this._renderDataInCard(this._cardData);
    }
    _renderDataInCard(cardData) {
        this._doctorSelected = document.querySelector('.container-item__modal-form-select');
        this._doctorSelected.value = cardData.doctor;
        this._doctorSelected.disabled = true;

        this._patientField = document.querySelector('.patient-info-field');
        this._patientField.innerHTML = "";
        this._patientField.append(this._createPatientInput('title', 'text', 'general-info', cardData.title));
        this._patientField.append(this._createPatientInput('name', 'text', 'user-content', cardData.content.name));
        this._patientField.append(this._createPatientInput('current-visit-date', 'date', 'user-content', cardData.content.date));
        switch (cardData.doctor) {
            case 'cardiologist':
            
                break;
            case 'dentist':
                break;
            case 'therapist':
                break;
            default:
                alert('Sorry, this card is broken');
        }
    }
    _renderDataInCard0(cardData) {
        const doctorType = document.querySelector('.doctor-type');
        const purposeOfVisit = document.querySelector('.input-aim');
        const visitorName = document.querySelector('.input-name');
        const dateOfVisit = document.querySelector('.input-visit-data');
        const forCardioAge = document.querySelector('.input-age-c');
        const forCardioWeight = document.querySelector('.input-weight');
        const forCardioBp = document.querySelector('.input-bp');
        const forCardioIllness = document.querySelector('.input-illness');
        const forTherapistAge = document.querySelector('.input-age-t');
        const forDentistDateOfLastVisit = document.querySelector('.input-date-of-last-visit');
        const blockCardio = document.querySelector('.doc-cardiologist');
        const blockDentist = document.querySelector('.doc-dentist');
        const blockTherapist = document.querySelector('.doc-therapist');
        const btnUpdate = document.querySelector('.btn-update-card');

        btnUpdate.setAttribute('data-update-btn-id', cardData.id);


        doctorType.innerHTML = cardData.doctor;
        purposeOfVisit.value = cardData.title;
        visitorName.value = cardData.content.name;
        dateOfVisit.value = cardData.content.date;

        switch (cardData.doctor) {
            case 'cardiologist':
                blockCardio.style.display = 'block';
                forCardioAge.value = cardData.content.age;
                forCardioWeight.value = cardData.content.weight;
                forCardioBp.value = cardData.content.bp;
                forCardioIllness.value = cardData.content.heartIllness;
                blockDentist.style.display = 'none';
                blockTherapist.style.display = 'none';
                break;
            case 'dentist':
                blockDentist.style.display = 'block';
                forDentistDateOfLastVisit.value = cardData.content.dateOfLastVisit;
                blockCardio.style.display = 'none';
                blockTherapist.style.display = 'none';
                break;
            case 'therapist':
                blockTherapist.style.display = 'block';
                forTherapistAge.value = cardData.content.age;
                blockDentist.style.display = 'none';
                blockCardio.style.display = 'none';
                break;
            default:
                alert('Sorry, this card is broken');
        }
    }

    _updateDataInCard() {
        const btnUpdate = document.querySelector('.btn-update-card');


        btnUpdate.addEventListener('click', async event => {
            const purposeOfVisit = document.querySelector('.input-aim').value;
            const visitorName = document.querySelector('.input-name').value;
            const dateOfVisit = document.querySelector('.input-visit-data').value;
            const forCardioAge = document.querySelector('.input-age-c').value;
            const forCardioWeight = document.querySelector('.input-weight').value;
            const forCardioBp = document.querySelector('.input-bp').value;
            const forCardioIllness = document.querySelector('.input-illness').value;
            const forTherapistAge = document.querySelector('.input-age-t').value;
            const forDentistDateOfLastVisit = document.querySelector('.input-date-of-last-visit').value;
            const btnCloseModal = document.querySelector('.modal-close');

            const cardiologist = {
                doctor: "cardiologist",
                title: `${purposeOfVisit}`,
                content: {
                    name: `${visitorName}`,
                    date: `${dateOfVisit}`,
                    bp: forCardioBp,
                    age: forCardioAge,
                    weight: forCardioWeight,
                    heartIllness: `${forCardioIllness}`,
                }
            };
            const therapist = {
                doctor: "therapist",
                title: `${purposeOfVisit}`,
                content: {
                    name: `${visitorName}`,
                    date: `${dateOfVisit}`,
                    age: forTherapistAge,
                }
            };
            const dentist = {
                doctor: "dentist",
                title: `${purposeOfVisit}`,
                content: {
                    name: `${visitorName}`,
                    date: `${dateOfVisit}`,
                    dateOfLastVisit: `${forDentistDateOfLastVisit}`,
                }
            };

            const doctorType = document.querySelector('.doctor-type').innerHTML;
            const cardId = event.target.getAttribute('data-update-btn-id');
            switch (doctorType) {
                case 'cardiologist':
                    event.preventDefault();
                    await this._requestActionWithCards.updateCard(cardiologist, cardId);
                    await btnCloseModal.click();
                    break;
                case 'dentist':
                    event.preventDefault();
                    await this._requestActionWithCards.updateCard(dentist, cardId);
                    await btnCloseModal.click();
                    break;
                case 'therapist':
                    event.preventDefault();
                    await this._requestActionWithCards.updateCard(therapist, cardId);
                    await btnCloseModal.click();
                    break;
                default:
                    alert('Sorry, this card is broken');
            }
        });
    }
    _resetModalForm() {
        this._doctorSelected.disabled = false;
        this._patientField.innerHTML = "";
        this._form.dataset.medicineType ="";
        this._form.reset();
    }
 }
