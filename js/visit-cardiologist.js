import {Visit} from './visit.js';

export class VisitСardiologist extends Visit {

    constructor(title, date, name, bp, age, weight, illness, description) {
        super(title, date, name);
        this._description = description;
        this._bp = bp
        this._age = age;
        this._weight = weight;
        this._illness = illness
        this._obj = {
            doctor: "cardiologist", 
            title: this._title, 
            description: this._description,
            content: {
                name: this._name,
                date: this._date,
                bp: this._bp,
                age: this._age,
                weight: this._weight,
                heartIllness: this._illness
            }
        }
    }
    async init() {
        await super.init()
        await this._postData(this._obj);

    }

}