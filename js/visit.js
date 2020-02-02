import {LocalStorageHelper} from "./local-storage-helper.js";
import {ActionWithCards, Auth} from "./action-with-cards.js";

export class Visit {
    _el
    constructor(title, date, name){
        this._title = title;
        this._date = date;
        this._name = name;
    }
    async init() {
        this.storageHelper = new LocalStorageHelper();
        const auth = new Auth();
        const token = await auth.loginUser("test321@gmail.com", "Testuser!");
        this.requestActionWithCards = new ActionWithCards(token);
        console.log('1');
        
    }
    appendTo(parent){
        parent.append(this.el);
    }
    async _postData(data) {
        // TODO: Trow error if not an object
        // TODO: Trow error in case of invalid data
        // TODO: Trow error in case of ERORR response
        console.log(this.requestActionWithCards);
        
        this.postResponse = await this.requestActionWithCards.createCard(data)
        console.log('POST - Response: ', this.postResponse);
        
    }
    _createLayout(card){
        // TODO: Throw error if card isn't an Object
        // TODO: Throw error if card doesn't contains properties
        const element = document.createElement('div');
        element.classList.add('card-wrapper');
        element.setAttribute('id', card.id);
        // TODO: Refactor innerHTML 
        element.innerHTML = `
            <button class="card-wrapper_btn card-wrapper_btn-delete" data-btn-id=${card.id}>X</button>
            <div class="card-wrapper_text-field card-wrapper_visitor-name">${card.content.name}</div>
            <div class="card-wrapper_text-field card-wrapper_doctor-for-visit">${card.doctor}</div>
            <button class="card-wrapper_btn card-wrapper_btn-show-more" data-btn-id=${card.id}>Показать больше</button>
            `;

        this._el = element;
    }
    
    destroy(){

    }
}


