function Ranking(selector) {
  Component.call(this, selector);
  this.numbers = [];
}

Ranking.prototype = Object.create(Component.prototype);
Ranking.constructor = Ranking;

Ranking.prototype.init = function() {
  const self = this;

  axios.get('http://localhost:3000/numbers')
    .then(function(response) {
      self.numbers = response.data.data.map(function(number) {
        return {
          id: number
        }
      });

      self.render();
    })
    .catch(function(error) {
      console.error(error);
    });
};

Ranking.prototype.render = function() {
  const container = this.getDOMElement();

  this.numbers.forEach(function(number) {
    const listElement = document.createElement('li');
    const numberElement = document.createElement('span');
    listElement.classList.add('list-group-item', 'list-group-item-ranking');    
    listElement.innerHTML = number.id;
    numberElement.classList.add('number', 'badge', 'badge-pill', 'badge-primary');
    numberElement.innerHTML = 0;

    container.appendChild(listElement);
    listElement.appendChild(numberElement);
  });
};

// Ranking.prototype.sorting = function() {
//   const container = document.getElementById('numbers-ranking');
//   const rankingList = document.getElementsByClassName('list-group-item-ranking');  

//   for (let i = 0; i < rankingList.length; i++) {
//     for (let j = 1; j < rankingList.length; j++) {
//       if (parseFloat(rankingList[j].childNodes[1].innerHTML) > (parseFloat(rankingList[j - 1].childNodes[1].innerHTML))) {
//         const bigger = rankingList[j - 1];
//         rankingList[j - 1] = rankingList[j];
//         rankingList[j] = bigger;
//         container.insertBefore(rankingList[j], container.firstChild);
//       }
//     }
//   }
// }