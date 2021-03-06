import {RequestHelper} from "./request-helper.js";
import {LocalStorageHelper} from "./local-storage-helper.js";


export class Auth {
    async loginUser(email, password) {
        const userCredentials = {
            email,
            password
        };
        const response = await RequestHelper.createUpdateData('POST', 'http://cards.danit.com.ua/login', userCredentials);
        // console.log('TOKEN______', response.token);
        return response.token
    }
}

export class ActionWithCards {
    storageHelper = new LocalStorageHelper();
    constructor(token) {
        this.userToken = token;
    }

    async getCards() {
        const resp = await RequestHelper.getOrDelData('GET', 'http://cards.danit.com.ua/cards', this.userToken);
        this.storageHelper.getDataAdnSetInStorage(resp);
        return resp
    }

    async getCard(cardID) {
        const resp = await RequestHelper.getOrDelData('GET', `http://cards.danit.com.ua/cards/${cardID}`, this.userToken);
        console.log('RESP GET CARD --------', resp);
        return  resp
    }

    async deleteCard(cardID) {
        const resp = await RequestHelper.getOrDelData('DELETE', `http://cards.danit.com.ua/cards/${cardID}`, this.userToken);
        this.storageHelper.deleteItemFromStorage(cardID);

        console.log('DEL resp', resp);
        return resp
    }

    async createCard(obj) {
        const resp = await RequestHelper.createUpdateData('POST', `http://cards.danit.com.ua/cards`, obj, this.userToken);
        this.storageHelper.addItemToStorage(resp);

        return resp
    }

    async updateCard(obj, cardID) {
        const resp = await RequestHelper.createUpdateData('PUT', `http://cards.danit.com.ua/cards/${cardID}`, obj, this.userToken);
        obj.id = `${cardID}`;
        this.storageHelper.updateItemFromStorage(obj, cardID);
        console.log('PUT_resp', resp);

        return resp
    }
}

/**
 * CHECK if everything OKAY with REQUESTs
 async function init() {
     const auth = new Auth();
     const token = await auth.loginUser("test321@gmail.com", "Testuser!");
     const test = new ActionWithCards(token);
     const respGetCards = await test.getCards();
     console.log('GET_ALL_CARDS', respGetCards);
     const respGetCard = await test.getCard(3063);
     console.log('GET_CARD',respGetCard);
     const respPostCard = await test.createCard(dentist);
     console.log('POST_CARD',respPostCard);
     const respPutCard = await test.updateCard(cardiologist, 4189);
     console.log('PUT_CARD',respPutCard);
     const respDeleteCard = await test.deleteCard(3501);
     console.log('DELETE_CARD',respDeleteCard);
 }
 
 init();
 */
