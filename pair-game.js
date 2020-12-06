(function () {
    const shuffle = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };

    const icons = [
        'fa-crow',
        'fa-dog',
        'fa-frog',
        'fa-cat',
        'fa-spider'
    ];

    const getCard = (icon) => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `<div class="front">
            <img src="./img/backside.jpg" alt="">
            </div>
            <div class="back">
            <i class="fas ${icon}"></i>
            </div>`;
        return div;
    };

    const row1 = document.querySelector('.card-container .row:first-child');
    const row2 = document.querySelector('.card-container .row:last-child');
    const iconList = icons.concat(icons);

    shuffle(iconList);
    for (let i = 0; i < 10; i++) {
        if (i < 5) {
            row1.appendChild(getCard(iconList[i]));
        } else {
            row2.appendChild(getCard(iconList[i]));
        };
    };

    let points = 0;
    const cards = document.querySelectorAll('.card');

    let blockClick = false;

    const flipCard = (ev) => {
        if (!blockClick) {
            ev.currentTarget.classList.toggle('card--flipped');
        }
        const flipped = document.querySelectorAll('.card--flipped');
        if (flipped.length > 1) {
            blockClick = true;
            const to = setTimeout(() => {
                clearTimeout(to);
                cards.forEach(card => card.classList.remove('card--flipped'));
                blockClick = false;
            }, 1000);
            const cls = document.querySelector('.card--flipped i').className.split(' ').pop();
            if (document.querySelectorAll(`.card--flipped i.${cls}`).length > 1) {
                points++;
                flipped.forEach(card => card.classList.add('fixed'));
            }
        }
    };

cards.forEach(card => card.addEventListener('click', flipCard));
})();


/* click counter and time starter */

    let button = document.querySelector('.card-container'),
        count = 0;
        button.onclick = function () {
        count += 1;
        document.querySelector('.moves').innerHTML = `Moves: ${count}`;
        if (count<=1) {timer ()}; 
        return
        };

    let stopper = document.querySelector('.time-span'),
    start = document.getElementById('start'),
    clear = document.querySelector('.reset'),
    seconds = 0, minutes = 0,
    t;
    
function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
      
stopper.innerHTML = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}

clear.onclick = function() {
    stopper.innerHTML = "00:00";
    minutes = 0; seconds = 0;
    clearTimeout(t);
}





