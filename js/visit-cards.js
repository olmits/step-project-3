import {ActionWithCards, Auth} from "./action-with-cards.js";
import {LocalStorageHelper} from "./local-storage-helper.js";
import {Visit} from './visit.js';
import {Draggable} from "./drag-drop-object.js";
import {sheduleItems, mainContainer, emptyState} from "./shedule-component.js";

export class VisitCards {
    requestActionWithCards;
    storageHelper;

    async init() {
        this.storageHelper = new LocalStorageHelper();
        const auth = new Auth();
        const token = await auth.loginUser("test321@gmail.com", "Testuser!");
        this._requestActionWithCards = new ActionWithCards(token);
        await this._renderCards();
    }

    _prepareVisitCard(card){
        const cardVisit = new Visit(card.title, card.content.date, card.content.name);
        cardVisit.init();
        cardVisit.createLayout('div', {'class': 'card-item', 'id': card.id}, card);

        const cardContainer = new Draggable(cardVisit);
        cardContainer.appendTo(mainContainer);
        sheduleItems.push({item: cardVisit, container: cardContainer});
    }

    async _renderCards() {
        const lsData = localStorage.getItem('cards');
        if(lsData === '' || lsData === null) {
            const arrOfCards = await this._requestActionWithCards.getCards();
            
            emptyState.style.display = 'none';
            
            arrOfCards.forEach(card => this._prepareVisitCard(card));
            
        } else if ((typeof(lsData) === 'string') && (lsData !== '[]')) {
            const arrOfCardsLS = this.storageHelper.getDataFromLC();
            
            emptyState.style.display = 'none';
            
            arrOfCardsLS.forEach(card => this._prepareVisitCard(card));
        } else {
            emptyState.style.display = 'block';
        }
    }
}
    
 async function init() {
     const start = new VisitCards();
     await start.init();
 }

 init();

