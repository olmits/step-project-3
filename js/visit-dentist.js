import {Visit} from './visit.js';

export class VisitDentist extends Visit {

    constructor(title, date, name, ldate, description) {
        super(title, date, name);
        this._description = description;
        this._ldate = ldate;
        this._obj = {
            doctor: "dentist", 
            title: this._title, 
            description: this._description,
            content: {
                name: this._name,
                date: this._date,
                dateOfLastVisit: this._ldate
            }
        }
        // this.init();
        
    }
    async init() {
        await super.init()
        this._postData(this._obj);
    }

}
