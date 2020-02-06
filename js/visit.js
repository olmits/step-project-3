import {LocalStorageHelper} from "./local-storage-helper.js";
import {ActionWithCards, Auth} from "./action-with-cards.js";
import {Shedule, SheduleException, sheduleItems} from "./shedule-component.js";
import {ShowMore} from "./card-form-modals.js";



export class Visit extends Shedule {
    _el
    constructor(title, date, name){
        super()
        this._title = title;
        this._date = date;
        this._name = name;
    }
    async init() {
        this.storageHelper = new LocalStorageHelper();
        const auth = new Auth();
        const token = await auth.loginUser("test321@gmail.com", "Testuser!");
        this._requestActionWithCards = new ActionWithCards(token);
        
    }
    async _postData(data) {
        if (typeof(data) !== 'object') {
            throw new SheduleException(`Error: ${data} must be an object`);
        }
        this._response = await this._requestActionWithCards.createCard(data)

        console.log('POST - Response: ', this._response);
        this.createLayout('div', {'class': 'card-item', 'id': this._response.id}, this._response);
        
    }
    createLayout(el, attrs, card){
        super.createLayout(el, attrs);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('card-item_btn', 'card-item_btn-delete');
        removeBtn.dataset.btnId = card.id;
        removeBtn.innerHTML = "&times;";
        this._remove = removeBtn;

        const infoName = document.createElement('div');
        infoName.classList.add('card-item_text-field', 'card-item_visitor-name');
        infoName.innerText = card.content.name[0].toUpperCase() + card.content.name.substring(1).toLowerCase();
        
        const infoDoctor = document.createElement('div');
        infoDoctor.classList.add('card-item_text-field', 'card-item_doctor-for-visit');
        infoDoctor.innerText = card.doctor[0].toUpperCase() + card.doctor.substring(1).toLowerCase();

        const moreBtn = document.createElement('button');
        moreBtn.classList.add('card-item_btn', 'card-item_btn-show-more');
        moreBtn.dataset.btnId = card.id;
        moreBtn.innerText = "Show More";
        this._more = moreBtn

        this._el.append(this._remove);
        this._el.append(infoName);
        this._el.append(infoDoctor);
        this._el.append(this._more);
        this._listenRemove();
        this._listenMoreBtn();
    }

    async _handleRemoving(){
        if (this._remove === 'undefined') {
            throw new SheduleException(`Error: ${this._remove} is undefined`);
        }
        if (!this._remove.hasAttribute('data-btn-id')) {
            throw new SheduleException(`Error: ${this._remove} doesn't contain card-id`);
        }
        const cardId = this._remove.dataset.btnId;
        await this._requestActionWithCards.deleteCard(cardId);
        const i = sheduleItems.findIndex( el => el.item._el === this._el);
        if (i == -1) {
            throw new SheduleException(`Error: ${sheduleItems} Array doesn't contain such item: 'item._el === ${this._el}'`)
        }
        sheduleItems[i].item.destroy()
        sheduleItems[i].container.destroy()
        sheduleItems.splice(i, 1);
        this._checkItemExistence();
    }
    async _handleMoreBtn(){
        let cardData
        const cardId = this._more.dataset.btnId;
        const dataLocalStorage = this.storageHelper.getDataFromLC();
        const i = dataLocalStorage.findIndex(el => el.id === cardId);
        if (i !== -1) {
            cardData = dataLocalStorage[i];
        } else {
            cardData = await this._requestActionWithCards.getCard(cardId);
        }
        
        const modalProcessing = new ShowMore(this._requestActionWithCards, cardData);
        modalProcessing.openModal();
    }
    _listenMoreBtn(){
        this._handleMoreBtn = this._handleMoreBtn.bind(this);
        this._more.addEventListener('click', this._handleMoreBtn)
    }
    _listenRemove(){
        this._handleRemoving = this._handleRemoving.bind(this);
        this._remove.addEventListener('click', this._handleRemoving);
    }
    destroy() {
        this._el.remove()
        this._more.removeEventListener('click', this._handleMoreBtn);
        this._remove.removeEventListener('click', this._handleRemoving);
        super.destroy();
    }
}
