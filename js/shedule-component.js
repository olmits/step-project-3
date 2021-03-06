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

    constructor(modal, form, closeBtn){
        this._form = form;
        this._modal = modal;
        this._closeBtn = closeBtn;
    }
    openModal() {
        this._modal.style.display = "block";
        this._handleModalClosing();
    }
    closeModal = (t, event) => {
        if (event.target == t) this._closeModalFunction();
    }
    _createPatientInput(name, type, dataTarget, value = '') {
        let patientInput = document.createElement('input');

        patientInput.dataset.target = dataTarget;
        patientInput.setAttribute('name', name);
        patientInput.setAttribute('type', type);
        patientInput.setAttribute('placeholder', name[0].toUpperCase() + name.substring(1).toLowerCase().replace('-', ' '));
        if (patientInput.dataset.target === 'hidden-info') patientInput.readOnly = true;
        if (type === 'number') patientInput.setAttribute('min', 0); // Doesn't work properly
        if (name === 'age') patientInput.setAttribute('max', 120); // Doesn't work properly
        if (name === 'bp') patientInput.setAttribute('pattern', '\d{1,3}\-\d{1,2}'); // Doesn't work properly
        patientInput.value = value
        patientInput.required= true

        return patientInput
    }
    _closeModalFunction() {
        this._modal.style.display = "none";
        this._removeListeners()
        this._resetModalForm()
    }
    _handleModalClosing() {
        
        this.closeModalButton = this.closeModal.bind(this, this._closeBtn)
        this._closeBtn.addEventListener('click', this.closeModalButton);

        this.closeModalWindow = this.closeModal.bind(this, this._modal)
        window.addEventListener('click', this.closeModalWindow);
    }
    proceedSubmit(event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        emptyState.style.display = 'none';
        this._formData = new FormData(this._form);

    }
    _handleFormSubmit() {
        this.proceedSubmit = this.proceedSubmit.bind(this);
        this._form.addEventListener('submit', this.proceedSubmit);
    }
    _removeListeners() {
        this._form.removeEventListener('submit', this.proceedSubmit);
        this._closeBtn.removeEventListener('click', this.closeModalButton);
        window.removeEventListener('click', this.closeModalWindow);
    }
}

export class SheduleException extends Error {
    constructor(...args) {
        super(...args);
    }
}