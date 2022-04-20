//sounds of the game
const hitSound = new Audio('sounds/swish.m4a');
const looseSound = new Audio('sounds/aww.mp3');
const winSound = new Audio('sounds/cash.mp3');
const timer = ms => new Promise(res => setTimeout(res, ms));

//initialize game variable
let myGameScore = 0;
let botGameScore = 0;
let wins = 0;
let looses = 0;
let draw = 0;
let YourScore = document.querySelector('#yourScore');
let botScore = document.querySelector('#botScore');
let TurnEnd = false;
//event listner on game buttons 
document.querySelector("#hit-btn").addEventListener('click',function hit(){
    if (TurnEnd === false){
    if(YourScore.textContent==='you are looser'){
        loosesCalc();  
    } else if(yourScore.textContent==='you are winner'){
        winCalc();
    }else if(yourScore.textContent==='draw'){
        drawCalc();
     }else if(botGameScore===myGameScore > 0){
        drawer();
    }else{
    hitSound.play();
    cardsGen('#my-board','#yourScore','human');
}}});

document.querySelector("#stand-btn").addEventListener('click',function stand(){ 
    if(YourScore.textContent==='you are looser'){
        loosesCalc();
    } else if(yourScore.textContent==='you are winner'){
        winCalc();
    }else if(yourScore.textContent==='draw'){
        drawCalc();
     }
    if (TurnEnd === false){     
    if(botGameScore===myGameScore > 0){
        drawer();
    }else{
        TurnEnd=true;   
    hitSound.play();
    botLogic();
}}});

document.querySelector("#deal-btn").addEventListener('click',function deal(){
    if(YourScore.textContent==='you are looser'){
        loosesCalc();
    } else if(yourScore.textContent==='you are winner'){
        winCalc();
     }else if(yourScore.textContent==='draw'){
        drawCalc();
     }
    if (TurnEnd === false){
      if(botGameScore===0){
        TurnEnd=true;  
            hitSound.play();
            botLogic();
        }
        else if(myGameScore>botGameScore){
            winner();
        }else if(botGameScore>myGameScore){
            looser();
        }else if(botGameScore===myGameScore > 0){
            drawer();
        }
        else{
    hitSound.play();
    resetScore();
    removeAllCards();
}TrunEnd=false; }});
//count number of looses
function loosesCalc(){
    looses++;
    resetScore();
    removeAllCards();
    displayResult();  
}
//count number of wins
function winCalc(){
    wins++;
    resetScore();
    removeAllCards()
    displayResult(); 
}
function drawCalc(){
    draw++;
    resetScore();
    removeAllCards()
    displayResult(); 
}
//cards image src and score database
var cardsDb = {
    card : { 2 : '2.png', 3 : '3.png'  , 4: '4.png' , 5 : '5.png' , 6 : '6.png' , 7: '7.png' , 8 : '8.png' , 9 :'9.png' , 10: '10.png', 11 : 'J.png',12 : 'Q.png' , 13: 'K.png' ,14 : 'A.png'},
    score : {'2.png' : 2 , '3.png' : 3 , '4.png' : 4 , '5.png' : 5 , '6.png' : 6 , '7.png' : 7 , '8.png' : 8 , '9.png' : 9 , '10.png' : 10 , 'J.png' : 10 , 'Q.png' : 10 , 'K.png' : 10 , 'A.png' : [1,11]}
}

//logic that bot will do 
async function botLogic(){
    let estimatedScore = 0;
    estimatedScore = myGameScore;
    if (estimatedScore <=10){
        estimatedScore = 11;
    }
    while(botGameScore < estimatedScore){
        hitSound.play();
        await timer(500); 
    cardsGen('#bot-board','#botScore','bot');
        }
        if(YourScore.textContent==='you are looser'){
            looser();
        } else if(yourScore.textContent==='you are winner'){
            winner();
         }else if(myGameScore>botGameScore){
                winner();
            }else if(botGameScore>myGameScore){
                looser();}else if(botGameScore===myGameScore){
                    drawer();}
                    
        
}

//display number of wins and looses in tables
function displayResult(){
    document.querySelector('#win-num').textContent=wins;
    document.querySelector('#looses-num').textContent=looses;
    document.querySelector('#draw-num').textContent=draw;
}

//generate ramdom card and show it in human or bot div based on the function input
function cardsGen(divLoc,showScore,player){
    if(myGameScore > 21){
        looser();
    } else if(botGameScore > 21){
        winner();
    }else{
   let cardNum = Math.floor( 13 * Math.random() + 2 );
    let imgSrc = cardsDb['card'][cardNum];
    let newCard = document.createElement('img');
    newCard.classList.add('blackjack-card');
    newCard.src = "images/"+imgSrc;
    document.querySelector(divLoc).appendChild(newCard);
    scoreCalculator(imgSrc,showScore,player);
}
}

//remove all cards in both bot and human
function removeAllCards(){
    var cardsReset = document.querySelectorAll('.blackjack-card');
    for (i=0 ; i<cardsReset.length ;i++){
    cardsReset[i].remove();
    }
}

//display you are loser or winner or draw
function looser(){
    yourScore.textContent = 'you are looser';
    yourScore.style.color = 'red';
    looseSound.play(); 
    TurnEnd = false;
}

function winner(){
    yourScore.textContent = 'you are winner';
    yourScore.style.color = 'green';
    winSound.play(); 
    TurnEnd = false;
}

function drawer(){
    yourScore.textContent = 'draw';
    yourScore.style.color = 'blue';
    winSound.play(); 
    TurnEnd = false;
}


//reset score after game end
function resetScore(){
    myGameScore = 0;
    botGameScore = 0
    yourScore.textContent = myGameScore;
    botScore.textContent = botGameScore;
    yourScore.style.color = 'white';
}

//calculate score and display it to the front-end and check for winner if got 21
function scoreCalculator(imgSrc,showScore,player) {
if(player==="human"){
    if (imgSrc === 'A.png') {
        if (myGameScore <= 10 ){
            myGameScore = myGameScore + 11;
            yourScore.textContent = myGameScore;
        } else {
            myGameScore = myGameScore + 1;
            yourScore.textContent = myGameScore;
        }
    }else {
   myGameScore = myGameScore + cardsDb['score'][imgSrc] ;
   yourScore.textContent = myGameScore;
    }
    if(myGameScore > 21){
        looser();}else if(myGameScore === 21){
        winner();
        }
    }else if(player==="bot"){
        if (imgSrc === 'A.png') {
            if (botGameScore <= 10 ){
                botGameScore = botGameScore + 11;
                botScore.textContent = botGameScore;
            } else {
                botGameScore = botGameScore + 1;
                botScore.textContent = botGameScore;
            }
        }else {
       botGameScore = botGameScore + cardsDb['score'][imgSrc] ;
       botScore.textContent = botGameScore;
        }
        if(botGameScore > 21){
            winner();
    }else if(botGameScore === 21){
        looser();
        }}
}