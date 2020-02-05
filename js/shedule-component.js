import {SheduleException} from "./shedule-exceptions.js";

export const sheduleItems = [];
export const emptyState = document.querySelector('.empty-state-wrapper');

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
    _checkItemExistence(){
        (sheduleItems.length < 2 ? emptyState.style.display = 'block' : emptyState.style.display = 'none');
    }
    destroy(){
        this._checkItemExistence();
    }
}