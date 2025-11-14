
let score = JSON.parse(localStorage.getItem('score')) ||
{
    win : 0,
    lose : 0, 
    draw : 0
}

updateScoreElem();
    

    //    if(!score){
//         score = {
//             win : 0,
//             lose : 0,
//             draw : 0
//         }
//    }
document.querySelector('.js-rock-button').addEventListener('click',()=>{
    myMove('rock');
});
document.querySelector('.js-paper-button').addEventListener('click',()=>{
    myMove('paper');
});
document.querySelector('.js-scissors-button').addEventListener('click',()=>{
    myMove('scissors');
});

document.querySelector('.js-auto-play-button').addEventListener('click',()=>{
    autoPlay();
});

document.querySelector('.js-reset-button').addEventListener('click',()=>{
    score.win = 0;
    score.lose = 0;
    score.draw = 0;
    localStorage.removeItem('score');
    updateScoreElem();
});

let isAutoPlay = false;

let intervalId;
function autoPlay(){
    if(!isAutoPlay){
       intervalId =  setInterval(() => {
        let move = computerMove();
        myMove(move);
        },1000);
        isAutoPlay = true;
    }
    else{
     clearInterval(intervalId);
     isAutoPlay=false;
    }
}


function myMove(move){
    const comMove = computerMove();
    let result = ''

    if (move === comMove){
    result += 'its draw';
    }
    else if((move ==='paper' && comMove == 'rock') || (move ==='scissors' && comMove === 'paper') || (move === 'rock' && comMove === 'scissors' )){
    result += 'its win';
    }
    else if((move ==='scissors' && comMove === 'rocks')|| (move === 'paper' && comMove === 'scissors') || (move === 'rock' && comMove === 'paper') || (move ==='scissors' && comMove === 'rock'))
    {
    result += 'its lose';
    }

    if(result == 'its draw'){
    score.draw += 1;
    }
    else if(result == 'its lose'){
    score.lose += 1;
    }
    else{
    score.win += 1;
    }
    
    localStorage.setItem('score',JSON.stringify(score));
    
    updateScoreElem();

    document.querySelector('.js-result1').innerHTML = result;
    

    document.querySelector('.js-result2').innerHTML = 
    ` you <img src="images/${move}-emoji.png" class="move-icon"alt=""> <img src="images/${comMove}-emoji.png" class="move-icon"alt=""> Computer`;


    // alert(`computer chose ${comMove} ${result}\n wins ${score.win} draws ${score.draw} loses ${score.lose}` )

}

function updateScoreElem(){
    document.querySelector('.js-score').innerHTML = `wins ${score.win} draws ${score.draw} loses ${score.lose}`;
}

function computerMove(){
    const arr = ['rock','paper','scissors']
    const index = Math.floor(Math.random()* arr.length);
    return arr[index];
}
computerMove()