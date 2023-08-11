# 5 Stages - Poker Calculation Game

## Basic
Every card includes its value. For example, "5 of Hearts" represents 5, "Ace of Clubs" represents 1.<br>
All face cards repersent 10.


## Rules
There are two buttons: <span style="color:#3f51b5"><b>Next Card</b></span> and <span style="color:#f50057"><b>Delete Card</b></span>.<br>
The information board shows the current stage of the game. If click <span style="color:#3f51b5"><b>Next Card</b></span>, it will draw the card from the deck and put it in the tail of the current stage<br>
<img height="300px" src="./public/guide/img1.png"></img><br>
After the card is sent, player can pick three cards from the first two and the last two cards in the current stage.<br>
<img height="320px" src="./public/guide/img2.png"></img><br>
If the sum of these three is divisible by 10, these three cards will put into the deck. For example, [J,8,2] can be picked because the sum equals 20.<br>
After the number of card in deck reaches 25, player have 5 chance of deleting the head card in a random stage.<br>
<img  src="./public/guide/img3.png"></img><br>
Player can click <span style="color:#f50057"><b>Delete Card</b></span> to delete the head card in a random stage. It costs 1 chance of deletion.<br>
If there is no card in the stage after players picking the cards or deletion, the stage will be cleared.<br>
If all stages are cleared, Player will win this game.<br>
If there is no card in deck, Player will lose this game.<br>
