/**
 * Event Listeners: https://developer.mozilla.org/en-US/docs/Web/Events
 */

//document.querySelector('#score-0').innerHTML = '<em>' + dice + '</em>';
//document.querySelector('.dice').style.display = 'none';

var scores, roundScore, activePlayer, gameOn, diceTemp1, diceTemp2;

initiateGame();

function initiateGame()
{
    gameOn = true;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

function nextPlayer()
{
    document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
    roundScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
    document.getElementById('current-0').textContent = '0';
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

function rollButton()
{
    if(gameOn)
    {
        //Roll the dice using random funtion
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        //Change image source based on the dice value
        var diceDOM1 = document.querySelector('.dice1');
        diceDOM1.style.display = 'block';
        diceDOM1.src = 'dice-'+ dice1 +'.png';

        var diceDOM2 = document.querySelector('.dice2');
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-'+ dice2 +'.png';

        //Condition if dice rolls to '1'
        if(dice1 !== 1 && dice2 !== 1)
        {    
            if((dice1 === 6 && diceTemp1 === 6)||(dice2 === 6 && diceTemp2 === 6))
            {
                scores[activePlayer] = 0;
                document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
                nextPlayer();
            }
            else
            {
                document.getElementById('current-'+activePlayer).textContent = roundScore += dice1 + dice2;
            }
        }
        else
        {
            nextPlayer();    
        }
        diceTemp1 = dice1;
        diceTemp2 = dice2;
    }
}

function holdButton()
{
    if(gameOn)
    {
        //Add crrent score to global score
        scores[activePlayer] += roundScore;

        //Update global score in UI
        document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
        document.getElementById('current-'+activePlayer).textContent = '0';
        
        var presetScore = document.getElementById('preset').value;

        if(!presetScore)
        {
            presetScore = 20;
        }

        //Check IF player won the game
        if(scores[activePlayer] >= presetScore)
        {
            document.getElementById('name-' + activePlayer).textContent = 'WINNER!!';
            document.querySelector('.dice1').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            gameOn = false;
        }
        else
        {
            //Next Player
            nextPlayer();    
        }
    }
}

document.querySelector('.btn-roll').addEventListener('click', rollButton);

document.querySelector('.btn-hold').addEventListener('click', holdButton);

document.querySelector('.btn-new').addEventListener('click', function()
{
    initiateGame();
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.getElementById('name-0').textContent = 'PLAYER 1';
    document.getElementById('name-1').textContent = 'PLAYER 2';
   // document.getElementById('preset').value = 'PRESET SCORE';
});