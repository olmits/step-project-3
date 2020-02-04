import {ActionWithCards, Auth} from "./action-with-cards.js";
import {LocalStorageHelper} from "./local-storage-helper.js";
import {Visit} from './visit.js';
import {Draggable} from "./drag-drop-object.js";
import {sheduleItems} from "./shedule-component.js";

export class VisitCards {
    requestActionWithCards;
    storageHelper;

    async init() {
        this.storageHelper = new LocalStorageHelper();
        const auth = new Auth();
        const token = await auth.loginUser("test321@gmail.com", "Testuser!");
        this.requestActionWithCards = new ActionWithCards(token);
        await this._renderCards();
        // await this._addListenerToRemoveCard();
        await this._openModal();
        await this._closeModal();
      //  await this._updateDataInCard();
    }

    async _renderCards() {
        const mainContainer = document.querySelector('.container-item__board-space');
        const emptyStateDiv = document.querySelector('.empty-state-wrapper');
        const lsData = localStorage.getItem('cards');
        if(lsData === '' || lsData === null) {
            emptyStateDiv.style.display = 'block';
            emptyStateDiv.style.display = 'none';
            const arrOfCards = await this.requestActionWithCards.getCards();
            // arrOfCards.forEach(card => this._createCard(mainContainer, card));
            arrOfCards.forEach(card => {
                const cardVisit = new Visit(card.title, card.content.date, card.content.name);
                cardVisit.createLayout('div', {'class': 'card-item', 'id': card.id}, card);

                const cardContainer = new Draggable(cardVisit);
                cardContainer.appendTo(mainContainer);
                sheduleItems.push({item: cardVisit, container: cardContainer});
            });
            
        } else {
            emptyStateDiv.style.display = 'none';
            const arrOfCardsLS = this.storageHelper.getDataFromLC();
            // arrOfCardsLS.forEach(card => this._createCard(mainContainer, card));
            arrOfCardsLS.forEach(card => {
                const cardVisit = new Visit(card.title, card.content.date, card.content.name);
                cardVisit.init();
                cardVisit.createLayout('div', {'class': 'card-item', 'id': card.id}, card);
                
                const cardContainer = new Draggable(cardVisit);
                cardContainer.appendTo(mainContainer);
                sheduleItems.push({item: cardVisit, container: cardContainer});
            });
        }
    }
    
    // _createCard(container, card) {
    //     const cardContainer = document.createElement('div');
    //     cardContainer.classList.add('card-item');
    //     cardContainer.setAttribute('id', card.id);
    //     cardContainer.innerHTML = `
    // <button class="card-item_btn card-item_btn-delete" data-btn-id=${card.id}>X</button>
    // <div class="card-item_text-field card-item_visitor-name">${card.content.name}</div>
    // <div class="card-item_text-field card-item_doctor-for-visit">${card.doctor}</div>
    // <button class="card-item_btn card-item_btn-show-more" data-btn-id=${card.id}>Показать больше</button>
    // `;
    //     container.append(cardContainer);
    // }

    //  async _addListenerToRemoveCard() {
    //     const deleteBtns = document.querySelectorAll('.card-item_btn-delete');
    //     deleteBtns.forEach(btn => {
    //         btn.addEventListener('click', async event => {
    //             if(btn === event.target) {
    //                 const cardID = btn.getAttribute('data-btn-id');
    //                 console.log('cardID', cardID);
    //                 await this.requestActionWithCards.deleteCard(cardID);
    //                 const cardContainer = document.getElementById(cardID);
    //                 cardContainer.remove();

    //  _addListenerToRemoveCard() {
    //     const deleteBtns = document.querySelectorAll('.card-wrapper_btn-delete');
    //     deleteBtns.forEach(btn => {
    //         btn.addEventListener('click', async event => {
    //             if(btn === event.target) {
    //                 const cardID = btn.getAttribute('data-btn-id');
    //                 console.log('cardID', cardID);
    //                 await this.requestActionWithCards.deleteCard(cardID);
    //                 const cardContainer = document.getElementById(cardID);
    //                 cardContainer.remove();

    //             }
    //         });
    //     });
    // }

    _openModal() {
        const modal = document.getElementById("showMoreModal");
        const btnShowMore = document.querySelectorAll(".card-item_btn-show-more");
        

        btnShowMore.forEach(btnMore => {
            btnMore.addEventListener('click', async event => {
                
                if(event.target === btnMore) {
                    modal.style.display = "block";
                    const cardID = btnMore.getAttribute('data-btn-id');
                    console.log('________cardID_________', cardID);
                    const cardData = await this.requestActionWithCards.getCard(cardID);
                    console.log('cardData_________', cardData);
                    this._renderDataInCard(cardData);
                }
            })
        });
    }

    _closeModal() {
        const modal = document.getElementById("showMoreModal");
        const btnClose = document.querySelector(".modal-close");

        btnClose.onclick = function() {
            modal.style.display = "none";
        };

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
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

     //   btnUpdate.setAttribute('data-update-btn-id', cardData.id);


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
        const doctorType = document.querySelector('.doctor-type').innerHTML;
        const purposeOfVisit = document.querySelector('.input-aim').value;
        const visitorName = document.querySelector('.input-name').value;
        const dateOfVisit = document.querySelector('.input-visit-data').value;
        const forCardioAge = document.querySelector('.input-age-c').value;
        const forCardioWeight = document.querySelector('.input-weight').value;
        const forCardioBp = document.querySelector('.input-bp').value;
        const forCardioIllness = document.querySelector('.input-illness').value;
        const forTherapistAge = document.querySelector('.input-age-t').value;
        const forDentistDateOfLastVisit = document.querySelector('.input-date-of-last-visit').value;
        const btnUpdate = document.querySelector('.btn-update-card');

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
            title: "textarea Цель визита",
            content: {
                name: `${visitorName}`,
                date: `${dateOfVisit}`,
                dateOfLastVisit: `${forDentistDateOfLastVisit}`,
            }
        };

        btnUpdate.addEventListener('click', async event => {
            switch (doctorType) {
                case 'cardiologist':
                    await this.requestActionWithCards.updateCard(cardiologist, );
                    break;
                case 'dentist':
                    await this.requestActionWithCards.updateCard(dentist, );
                    break;
                case 'therapist':
                    await this.requestActionWithCards.updateCard(therapist, );
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

