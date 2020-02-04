import {Visit} from './visit.js';

export class VisitTherapist extends Visit {
    
    constructor(title, date, name, age, description) {
        super(title, date, name);
        this._description = description;
        this._age = age;
        this._obj = {
            doctor: "therapist", 
            title: this._title, 
            description: this._description,
            content: {
                name: this._name,
                date: this._date,
                age: this._age
            }
        }
    }
    async init() {
        await super.init()
        await this._postData(this._obj);
    }
}
