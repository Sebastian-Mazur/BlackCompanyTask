const ranking = new Ranking('#numbers-ranking');
ranking.init();

const random = new Random('#random-numbers');
const getNumbers = function() {
    random.init();
}

getNumbers();

setInterval(getNumbers, 10000);