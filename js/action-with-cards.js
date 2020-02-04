import {RequestHelper} from "./request-helper.js";
import {LocalStorageHelper} from "./local-storage-helper.js";

const cardiologist = {
    doctor: "Cardiologist",
    title: "123textarea Цель визита",
    content: {
        name: "Bob",
        date: "01.02.2020",
        bp: "24",
        age: 23,
        weight: 70,
        heartIllness: false,
    }
};
const therapist = {
    doctor: "Therapist",
    title: "textarea Цель визита",
    content: {
        name: "Ivan vjhbkhbkhbh bjhbhjbjhbjhbjbjh",
        date: "01.02.2020",
        age: 23,
    }
};
const dentist = {
    doctor: "Dentist",
    title: "textarea Цель визита",
    content: {
        name: "Ivan vjhbkhbkhbh bjhbhjbjhbjhbjbjh",
        date: "01.02.2020",
        dateOfLastVisit: "24.01.2020",
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
        const resp = await RequestHelper.getOrDelData('GET', `http://cards.danit.com.ua/cards/${cardID}`, this.userToken);
        await console.log('RESP GET CARD --------', resp);
        return  resp
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
    const respGetCard = await test.getCard(3063);
    await console.log('GET_CARD',respGetCard);
    // const respPostCard = await test.createCard(dentist);
    // await console.log('POST_CARD',respPostCard);
    // const respPutCard = await test.updateCard(cardiologist, 3411);
    // await console.log('PUT_CARD',respPutCard);
    // const respDeleteCard = await test.deleteCard(3501);
    // await console.log('DELETE_CARD',respDeleteCard);
}

init();
