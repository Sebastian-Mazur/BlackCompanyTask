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