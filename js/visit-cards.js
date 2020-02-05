import {ActionWithCards, Auth} from "./action-with-cards.js";
import {LocalStorageHelper} from "./local-storage-helper.js";
import {Visit} from './visit.js';
import {Draggable} from "./drag-drop-object.js";
import {sheduleItems, emptyState, Modal} from "./shedule-component.js";

export const showMoreModal = document.getElementById("showMoreModal");
export const showMoreCloseBtn = document.querySelector(".modal-close");

export class VisitCards {
    requestActionWithCards;
    storageHelper;

    async init() {
        this.storageHelper = new LocalStorageHelper();
        const auth = new Auth();
        const token = await auth.loginUser("test321@gmail.com", "Testuser!");
        this.requestActionWithCards = new ActionWithCards(token);
        await this._renderCards();
    }

    async _renderCards() {
        const mainContainer = document.querySelector('.container-item__board-space');
        const lsData = localStorage.getItem('cards');
        if(lsData === '' || lsData === null) {
            console.log(1);
            
            const arrOfCards = await this.requestActionWithCards.getCards();
            
            emptyState.style.display = 'none';
            
            arrOfCards.forEach(card => {
                const cardVisit = new Visit(card.title, card.content.date, card.content.name);
                cardVisit.createLayout('div', {'class': 'card-item', 'id': card.id}, card);

                const cardContainer = new Draggable(cardVisit);
                cardContainer.appendTo(mainContainer);
                sheduleItems.push({item: cardVisit, container: cardContainer});
            });
            
        } else if ((typeof(lsData) === 'string') && (lsData !== '[]')) {
            const arrOfCardsLS = this.storageHelper.getDataFromLC();
            
            emptyState.style.display = 'none';
            
            arrOfCardsLS.forEach(card => {
                const cardVisit = new Visit(card.title, card.content.date, card.content.name);
                cardVisit.init();
                cardVisit.createLayout('div', {'class': 'card-item', 'id': card.id}, card);
                
                const cardContainer = new Draggable(cardVisit);
                cardContainer.appendTo(mainContainer);
                sheduleItems.push({item: cardVisit, container: cardContainer});
            });
        } else {
            console.log(3);
            emptyState.style.display = 'block';
        }
    }
}
    
export class ShowMore  extends Modal {

    constructor(modal, closeBtn, cardData) {
        super(modal, closeBtn)
        this._cardData = cardData;
        this._updateDataInCard();
    }
    openModal(){
        super.openModal();
        this._renderDataInCard(this._cardData);
    }

    _renderDataInCard(cardData) {
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
                    await this.requestActionWithCards.updateCard(cardiologist, cardId);
                    await btnCloseModal.click();
                    break;
                case 'dentist':
                    event.preventDefault();
                    await this.requestActionWithCards.updateCard(dentist, cardId);
                    await btnCloseModal.click();
                    break;
                case 'therapist':
                    event.preventDefault();
                    await this.requestActionWithCards.updateCard(therapist, cardId);
                    await btnCloseModal.click();
                    break;
                default:
                    alert('Sorry, this card is broken');
            }
        });
    }
 }

 async function init() {
     const start = new VisitCards();
     await start.init();
 }

 init();

