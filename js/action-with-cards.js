import {RequestHelper} from "./request-helper.js";
import {LocalStorageHelper} from "./local-storage-helper.js";

const userCredentials = {
    doctor: "Cardiolog555 ghjkbnmk;l ghvjjk;l",
    title: "Цель визита2q  ghjlkk",
    description: "Краткое описание визита",
    status: "open",
    priority: "Приоритет",
    content: {
        name: "Ivan vjhbkhbkhbh bjhbhjbjhbjhbjbjh",
        bp: "24",
        age: 23,
        weight: 70,
        heartIllness: false,
        date: "01.02.2020",
        comment: "user comment"
    }
};

export class Auth {
    async loginUser(email, password) {
        const userCredentials = {
            email,
            password
        };
        const response = await RequestHelper.createUpdateData('POST', 'http://cards.danit.com.ua/login', userCredentials);
        console.log('TOKEN______', response.token);
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
        await this.storageHelper.getDataAdnSetInStorage(resp);
        return resp
    }

    async getCard(cardID) {
        return await RequestHelper.getOrDelData('GET', `http://cards.danit.com.ua/cards/${cardID}`, this.userToken)
    }

    async deleteCard(cardID) {
        const resp = await RequestHelper.getOrDelData('DELETE', `http://cards.danit.com.ua/cards/${cardID}`, this.userToken);
        await this.storageHelper.deleteItemFromStorage(cardID);

        await console.log('resprespresp', resp);
        return resp
    }

    async createCard(obj) {
        const resp = await RequestHelper.createUpdateData('POST', `http://cards.danit.com.ua/cards`, obj, this.userToken);
        await this.storageHelper.addItemToStorage(resp);

        return resp
    }

    async updateCard(obj, cardID) {
        const resp = await RequestHelper.createUpdateData('PUT', `http://cards.danit.com.ua/cards/${cardID}`, obj, this.userToken);
        obj.id = `${cardID}`;
        await this.storageHelper.updateItemFromStorage(obj, cardID);

        return resp
    }
}

async function init() {
    const auth = new Auth();
    const token = await auth.loginUser("test321@gmail.com", "Testuser!");
    const test = new ActionWithCards(token);
    // const respGetCards = await test.getCards();
    // await console.log('GET_ALL_CARDS', respGetCards);
    // const respGetCard = await test.getCard(3148);
    // await console.log('GET_CARD',respGetCard);
    //const respPostCard = await test.createCard(userCredentials);
   //  await console.log('POST_CARD',respPostCard);
    // const respPutCard = await test.updateCard(userCredentials, 3411);
    // await console.log('PUT_CARD',respPutCard);
    // const respDeleteCard = await test.deleteCard(3501);
    // await console.log('DELETE_CARD',respDeleteCard);
}

init();
