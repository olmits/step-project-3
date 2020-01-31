import {ActionWithCards, Auth} from "./action-with-cards.js";
import {LocalStorageHelper} from "./local-storage-helper.js";

export class VisitCards {
    requestActionWithCards;
    storageHelper;

    async init() {
        this.storageHelper = new LocalStorageHelper();
        const auth = new Auth();
        const token = await auth.loginUser("test321@gmail.com", "Testuser!");
        this.requestActionWithCards = new ActionWithCards(token);
        await this._renderCards();
        await this._addListenerToRemoveCard();
    }

    async _renderCards() {
        const mainContainer = document.querySelector('.container-item__board-space');
        const emptyStateDiv = document.querySelector('.empty-state-wrapper');
        const lsData = localStorage.getItem('cards');
        if(lsData === '' || lsData === null) {
            emptyStateDiv.style.display = 'block';
            emptyStateDiv.style.display = 'none';
            const arrOfCards = await this.requestActionWithCards.getCards();
            arrOfCards.forEach(card => this._createCard(mainContainer, card));
        } else {
            emptyStateDiv.style.display = 'none';
            const arrOfCardsLS = this.storageHelper.getDataFromLC();
            arrOfCardsLS.forEach(card => this._createCard(mainContainer, card));
        }
    }

    _createCard(container, card) {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-wrapper');
        cardContainer.setAttribute('id', card.id);
        cardContainer.innerHTML = `
    <button class="card-wrapper_btn card-wrapper_btn-delete" data-btn-id=${card.id}>X</button>
    <div class="card-wrapper_visitor-name">${card.content.name}</div>
    <div class="card-wrapper_doctor-for-visit">${card.doctor}</div>
    <button class="card-wrapper_btn card-wrapper_btn-show-more" data-btn-id=${card.id}>Показать больше</button>
    `;
        container.append(cardContainer);
    }

     _addListenerToRemoveCard() {
        const deleteBtns = document.querySelectorAll('.card-wrapper_btn-delete');
        deleteBtns.forEach(btn => {
            btn.addEventListener('click', async event => {
                if(btn === event.target) {
                    const cardID = btn.getAttribute('data-btn-id');
                    console.log('cardID', cardID);
                    await this.requestActionWithCards.deleteCard(cardID);
                    const cardContainer = document.getElementById(cardID);
                    cardContainer.remove();

                }
            });
        });
    }
 }

 async function init() {
     const start = new VisitCards();
     await start.init();
 }

 init();

