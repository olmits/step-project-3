import {Shedule} from "./shedule-component.js"

export class DraggableObject extends Shedule{
    _el
    constructor(card) {
        this._card = card
        this.createLayout('div', {})
    }
    createLayout(el, attrs) {
        super.createLayout(el, attrs);
    }
}