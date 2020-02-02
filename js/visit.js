import {LocalStorageHelper} from "./local-storage-helper.js";
import {ActionWithCards, Auth} from "./action-with-cards.js";

export class Visit {
    _el
    constructor(title, date, name){
        this._title = title;
        this._date = date;
        this._name = name;
        this.init();
    }
    async init() {
        this.storageHelper = new LocalStorageHelper();
        const auth = new Auth();
        const token = await auth.loginUser("test321@gmail.com", "Testuser!");
        this.requestActionWithCards = new ActionWithCards(token);

    }
    appendTo(parent){

    }

    _createLayout(){
        const element = document.createElement('div');
        element.classList.add('card-wrapper');
    }
    
    destroy(){

    }
}

// export default Visit;
