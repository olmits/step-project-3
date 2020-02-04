import {SheduleException} from "./shedule-exceptions.js";

export class Shedule {
    _el

    appendTo(parent){
        parent.append(this._el);
    }
    createLayout(el, attrs){
        if (typeof(el) !== 'string') {
            throw new SheduleException(`${el} must be a string`);
        }
        if (typeof(attrs) !== 'object') {
            throw new SheduleException(`${attrs} must be an object`);
        }
        let element = document.createElement(el);
        if(attrs){
            Object.entries(attrs).forEach(([key, value])=>{
                element.setAttribute(key, value);
            })
        }
        this._el = element;
    }
    destroy(){

    }
}