import {Shedule, sheduleItems} from "./shedule-component.js"

let draggableObject = null;

export class Draggable extends Shedule{
    _handleDragStart = event => {
        this._el.style.opacity = '0.4';
        draggableObject = this._el;
        
        let cardTriangle = draggableObject.getBoundingClientRect();
        let offsetX = (event.clientX - cardTriangle.left);
        let offsetY = (event.clientY - cardTriangle.top);
        
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/html', this._el.innerHTML);
        event.dataTransfer.setDragImage(draggableObject, offsetX, offsetY);

        sheduleItems.forEach(el => {
            el.container._el.classList.add('draggable');
        })
    };
    _handleDragOver = event => {
        if (event.preventDefault) {
            event.preventDefault();
        }
        if (event.target.classList.contains('card-wrapper')) {
            
            const sib = this._verifySiblings(draggableObject, event.target);
            if (sib) {
                event.target.parentNode.insertBefore(draggableObject, event.target);
            } else {
                event.target.parentNode.insertBefore(draggableObject, event.target.nextSibling);
            }
        }
    };
    _handleDragEnd = () => {
        this._el.removeAttribute('style');
        sheduleItems.forEach(el => {
            el.container._el.classList.remove('draggable');
        })
        draggableObject = null;
    };

    constructor(card) {
        super()
        this._card = card;
        this.createLayout('div', {'class': 'card-wrapper', 'draggable': 'true'});
    }
    createLayout(el, attrs) {
        super.createLayout(el, attrs);
        this._card.appendTo(this._el);
        this._listenDraggable();
    }
    _listenDraggable() {
        this._el.addEventListener('dragstart', this._handleDragStart, false);
        this._el.addEventListener('dragover', this._handleDragOver, false);
        this._el.addEventListener('dragend', this._handleDragEnd, false);
    }
    _verifySiblings(el, sib){
        let current
        if (sib.parentNode === el.parentNode) {
            for(current = el.previousSibling; current; current = current.previousSibling ) {
                if (current === sib) return true
            }
        } else {
            return false;
        }
    }
      
    destroy(){
        this._el.removeEventListener('dragstart', this._handleDragStart);
        this._el.removeEventListener('dragover', this._handleDragOver);
        this._el.removeEventListener('dragend', this._handleDragEnd);
        this._el.remove();
        super.destroy();
    }
}