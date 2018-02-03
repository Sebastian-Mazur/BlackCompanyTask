function Random(selector) {
    Component.call(this, selector);
    this.numbers = [];
}

Random.prototype = Object.create(Component.prototype);
Random.constructor = Random;

Random.prototype.init = function () {
    const self = this;
    const container = this.getDOMElement();
    const listGroup = document.getElementsByClassName('list-group-random');

    axios.get('http://localhost:3000/random-numbers')
        .then(function (response) {
            self.numbers = response.data.data.map(function (number) {
                return {
                    id: number
                }
            });

            if (listGroup[0].childNodes.length === 0) {
                self.render();
            } else if (listGroup[0].childNodes.length > 0) {
                while (container.firstChild) {
                    container.removeChild(container.firstChild);
                }
                self.render();
            };

            self.sorting();            
        })
        .catch(function (error) {
            console.error(error);
        });
};

Random.prototype.render = function () {
    const container = this.getDOMElement();   

    this.numbers.forEach(function (number) {
        const listElement = document.createElement('li');
        listElement.classList.add('list-group-item');        
        listElement.innerHTML = number.id;        

        container.appendChild(listElement);            
    });    
};

Random.prototype.sorting = function () {
    const container = document.getElementById('numbers-ranking'); 
    const rankingList = document.getElementsByClassName('list-group-item-ranking');
    const numberElement = document.getElementsByClassName('number');    

    this.numbers.forEach(function (number) {
        for (let i = 0; i < rankingList.length; i++) {
            if (parseFloat(rankingList[i].innerHTML) === number.id) {                              
                numberElement[i].innerHTML = parseFloat(numberElement[i].textContent) + 1;
            }            
        }
    });
    
    for (let i = 0; i < rankingList.length; i++) {
        for (let j = 1; j < rankingList.length; j++) {
            if (parseFloat(rankingList[j].childNodes[1].innerHTML) > (parseFloat(rankingList[j - 1].childNodes[1].innerHTML))) {
                const bigger = rankingList[j - 1];
                rankingList[j - 1] = rankingList[j];
                rankingList[j] = bigger;
                container.insertBefore(rankingList[j], container.firstChild);
            }
        }
    }
};

