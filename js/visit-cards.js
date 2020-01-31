
class VisitCards {

    constructor() {}

    _renderCards() {

    }

    _createCard(card) {
        const mainContainer = document.querySelector('.container-item__board');
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-wrapper');
        cardContainer.setAttribute('data-card-id', card.id);
        cardContainer.innerHTML = `
    <button class="btn btn-delete" data-btn-id=\`${card.id}\`>X</button>>
    <div class="visitor-name"></div>
    <div class="doctor-for-visit"></div>
    <button class="btn btn-show-more" data-btn-id=\`${card.id}\`>Показать больше</button>>
    `;
    }
 }
