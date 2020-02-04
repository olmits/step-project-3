import {LocalStorageHelper} from "./local-storage-helper.js";
import {ActionWithCards, Auth} from "./action-with-cards.js";
import {Shedule, sheduleItems} from "./shedule-component.js";
import {Draggable} from "./drag-drop-object.js";


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
        this.requestActionWithCards = new ActionWithCards(token);
        
        
    }
    async _postData(data) {
        // TODO: Trow error if not an object
        // TODO: Trow error in case of invalid data
        // TODO: Trow error in case of ERORR response
        
        this._response = await this.requestActionWithCards.createCard(data)
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
        
    }
    async _handleRemoving(){
        const cardId = this._remove.dataset.btnId;
        await this.requestActionWithCards.deleteCard(cardId);
        // TODO: Trow error if not an object
        // TODO: Trow error in case of params abscent
        const i = sheduleItems.findIndex( el => el.item._el === this._el);
        sheduleItems[i].item.destroy()
        sheduleItems[i].container.destroy()
        sheduleItems.splice(i, 1);
    }
    _listenRemove(){
        this._handleRemoving = this._handleRemoving.bind(this);
        this._remove.addEventListener('click', this._handleRemoving);
    }
    destroy() {
        this._el.remove()
        this._remove.removeEventListener('click', this._handleRemoving);
        super.destroy();
    }
}


