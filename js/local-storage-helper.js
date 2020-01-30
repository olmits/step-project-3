export class LocalStorageHelper {

     getDataFromStorage(cardsArr) {
         localStorage.setItem('cards', JSON.stringify(cardsArr));
     }

     addItemToStorage(card) {
          const cardsArr = JSON.parse(localStorage.getItem('cards'));
          console.log('cardsArr', cardsArr);
          cardsArr.push(card);
          localStorage.setItem('cards', JSON.stringify(cardsArr));
     }

     updateItemFromStorage(obj, cardID) {
          const cardsArr = JSON.parse(localStorage.getItem('cards'));
          for (let i = 0; i < cardsArr.length; i++) {
               if(parseInt(cardsArr[i].id) === cardID){
                    cardsArr[i] = obj
               }
          }
          console.log('cardsArr', cardsArr);
          localStorage.setItem('cards', JSON.stringify(cardsArr));
     }

     deleteItemFromStorage(cardID) {
          const cardsArr = JSON.parse(localStorage.getItem('cards'));
          const newArr = cardsArr.filter(card => parseInt(card.id) !== cardID);
          localStorage.setItem('cards', JSON.stringify(newArr));
     }
}

