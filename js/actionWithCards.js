import {RequestHelper} from "./request-helper.js";

const userCredentials = {
    doctor: "cardiolog123456789",
    title: "Цель визита2",
    description: "Краткое описание визита",
    status: "open",
    priority: "Приоритет",
    content: {
        bp: "24",
        age: 23,
        weight: 70,
        heartIllness: false,
        name: "value",
        date: "01.02.2020",
        comment: "user comment"
    }
};

class Auth {
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

class ActionWithCards {

    constructor(token) {
        this.userToken = token;
    }

    async getCards() {
        return await RequestHelper.getOrDelData('GET', 'http://cards.danit.com.ua/cards', this.userToken);
    }

    async getCard(cardID) {
        return await RequestHelper.getOrDelData('GET', `http://cards.danit.com.ua/cards/${cardID}`, this.userToken)
    }

    async deleteCard(cardID) {
        return await RequestHelper.getOrDelData('DELETE', `http://cards.danit.com.ua/cards/${cardID}`, this.userToken)
    }

    async createCard(obj) {
        return await RequestHelper.createUpdateData('POST', `http://cards.danit.com.ua/cards`, obj, this.userToken);
    }

    async updateCard(obj, cardID) {
        return await RequestHelper.createUpdateData('PUT', `http://cards.danit.com.ua/cards/${cardID}`, obj, this.userToken);
    }
}

async function init() {
    const auth = new Auth();
    const token = await auth.loginUser("test123@gmail.com", "Testuser!");
    const test = new ActionWithCards(token);
    const respGetCards = await test.getCards();
    await console.log('GET_ALL_CARDS', respGetCards);
    const respGetCard = await test.getCard(3148);
    await console.log('GET_CARD',respGetCard);
    const respPostCard = await test.createCard(userCredentials);
    await console.log('POST_CARD',respPostCard);
    const respPutCard = await test.updateCard(userCredentials, 3169);
    await console.log('PUT_CARD',respPutCard);
    const respDeleteCard = await test.deleteCard(3164);
    await console.log('DELETE_CARD',respDeleteCard);
}

init();
