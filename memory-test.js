var width = visualViewport.width;
var height = visualViewport.height;
function tryagainbutton() {
    var tryAgain = document.createElement('div');
    tryAgain.style.position = 'absolute';
    tryAgain.style.width = '200x';
    tryAgain.style.height = '50px';
    tryAgain.style.fontSize = '35px';
    tryAgain.style.borderRadius = '10px';
    tryAgain.style.border = '5px solid black';
    tryAgain.style.top = `${height/2-100}px`;
    tryAgain.style.right = `50px`;
    tryAgain.innerHTML = 'try again';
    document.body.appendChild(tryAgain);
    return tryAgain;
}
function start(cardlist) {
    var secondsElapsed = 0;
    var haswon = false;//this will control whether or not to run the timer 
    var cardspicked = [];
    var mistakes = 0;
    var resultMistakes = document.getElementById('mistakes');
    resultMistakes.style.top = `${height/2}px`;
    var timeElapsedElem = document.getElementById('time');
    timeElapsedElem.style.top = `${height/2-50}px`;
    
    function tracktime() {
        setTimeout(() => {
            if(!haswon) {
                secondsElapsed += 0.1;
                secondsElapsed = secondsElapsed.toFixed(1);//round the decimal to prevent long numbers
                secondsElapsed = Number(secondsElapsed);
                //toFixed() returns a string so make it an integer/floating point
                timeElapsedElem.innerHTML = `Seconds: ${secondsElapsed}`;
                tracktime();//run again
            }
        },100);
    }
    tracktime();

    cardlist.forEach((card) => {
        card.addEventListener('click',() => {
            if(cardspicked.length < 2 && card!=cardspicked[0] && card.style.backgroundColor!='white') {
                cardspicked.push(card);
                card.style.backgroundColor = 'white';
                try {
                    var secondCard = cardspicked[1-cardspicked.indexOf(card)];
                    if(secondCard.innerHTML!=card.innerHTML) {
                        setTimeout(()=>{
                            secondCard.style.backgroundColor = 'black';
                            card.style.backgroundColor = 'black';
                        },400)
                        cardspicked = [];//reset cardspicked as those cards will no longer be picked
                        mistakes += 1;
                        resultMistakes.innerHTML = `Mistakes: ${mistakes}`;//update mistakes element
                    } else cardspicked = [];
                } catch(err) {}
            }
            var whitecards = 0;
            //loop through cardlist and check if the amount of white cards == the length of cardlist
            //if it is then the player wins
            for(var i = 0;i<cardlist.length;i++) {
                var currcard = cardlist[i];
                if(currcard.style.backgroundColor=='white') {
                    whitecards += 1;
                }
            } 
            if(whitecards>=cardlist.length) {
                haswon = true; 
                var tryAgain = tryagainbutton();
                tryAgain.addEventListener('click',() => {
                    haswon = false;
                    tracktime();
                    tryAgain.remove();//reset everything
                    resultMistakes.innerHTML = 'Mistakes: 0';
                    timeElapsedElem.innerHTML = 'Seconds: 0';
                    mistakes = 0;
                    secondsElapsed = 0;
                    for(var i = 0;i<cardlist.length;i++) {
                        var currcard = cardlist[i];
                        currcard.style.backgroundColor = 'black';
                    }
                });
            }
        });
    });
}
function stylingPositioning() {
    function position(cardlist) {
        var poslist = [];
        for (var i = 0;i < cardlist.length;i++) {
            var randompos = Math.round(Math.random()*19);
            while(poslist.indexOf(randompos)!=-1) {
                randompos = Math.round(Math.random()*19);
            }
            var current = cardlist[i];
            poslist.push(randompos);
            current.style.top = `${width/46*(randompos-randompos%5)+width/16}px`;
            current.style.left = `${width/6.4*(randompos%5)+width/16}px`;
            if(randompos%5==0) {
                current.style.left = `100px`;
            }
        }
    }

    var cardList = [];
    for(var i = 1;i <= 10;i++) {
        var currentFirst = document.getElementById(`${i}1`);
        var currentSecond = document.getElementById(`${i}2`);
        
        cardList.push(currentFirst);
        cardList.push(currentSecond);
    }
    position(cardList);
    return cardList
}
var cardlist = stylingPositioning();
start(cardlist);