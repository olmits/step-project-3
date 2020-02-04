import {Shedule} from "./shedule-component.js"

export class Draggable extends Shedule{
    _el
    constructor(card) {
        super()
        this._card = card;
        this.createLayout('div', {'class': 'card-wrapper'});
    }
    createLayout(el, attrs) {
        super.createLayout(el, attrs);
        this._card.appendTo(this._el);
    }
    destroy(){

        super.destroy()
    }
}