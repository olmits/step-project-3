export class LocalStorageHelper {

     getDataFromLC() {
          return JSON.parse(localStorage.getItem('cards'));
     }

     getDataAdnSetInStorage(cardsArr) {
         localStorage.setItem('cards', JSON.stringify(cardsArr));
     }

     addItemToStorage(card) {
          const cardsArr = JSON.parse(localStorage.getItem('cards'));
          cardsArr.push(card);
          localStorage.setItem('cards', JSON.stringify(cardsArr));
     }

     updateItemFromStorage(obj, cardID) {
          const cardsArr = JSON.parse(localStorage.getItem('cards'));
          for (let i = 0; i < cardsArr.length; i++) {
               if(parseInt(cardsArr[i].id) === parseInt(cardID)){
                    cardsArr[i] = obj;
               }
          }
          localStorage.setItem('cards', JSON.stringify(cardsArr));
     }

     deleteItemFromStorage(cardID) {
          const cardsArr = JSON.parse(localStorage.getItem('cards'));
          const newArr = cardsArr.filter(card => {console.log('Remove from LS data', card.id, cardID, parseInt(card.id) !== cardID); return card.id !== cardID});
          console.log('Remove from LS', newArr);
          localStorage.setItem('cards', JSON.stringify(newArr));
     }
}
