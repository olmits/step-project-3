import {SheduleException} from "./shedule-exceptions.js";

export const sheduleItems = [];
export const emptyState = document.querySelector('.empty-state-wrapper');
export const mainContainer = document.querySelector('.container-item__board-space');

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
        (sheduleItems.length < 1 ? emptyState.style.display = 'block' : emptyState.style.display = 'none');
    }
    destroy(){}
}

export class Modal {

    constructor(modal, closeBtn){
        this._modal = modal;
        this._closeBtn = closeBtn;
    }
    openModal() {
        this._modal.style.display = "block";
        this._handleModalClosing();
    }
    closeModal = (t, event) => {
        if (event.target == t) {
            this._closeModalFunction();
        }
    }
    _closeModalFunction() {
        this._modal.style.display = "none";
        this._removeListeners()
    }
    _handleModalClosing() {
        this.closeModalButton = this.closeModal.bind(this, this._closeBtn)
        this._closeBtn.addEventListener('click', this.closeModalButton);

        this.closeModalWindow = this.closeModal.bind(this, this._modal)
        window.addEventListener('click', this.closeModalWindow);
    }
    _removeListeners() {
        this._closeBtn.removeEventListener('click', this.closeModalButton);
        window.removeEventListener('click', this.closeModalWindow);
    }
}
