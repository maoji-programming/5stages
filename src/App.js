import { useState, useEffect } from 'react';

import Poker from './components/Poker'
import Timer from './components/Timer'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import MuiAlert from '@material-ui/lab/Alert';
import { Typography , Snackbar} from '@material-ui/core';

import './App.css';



function initialize() {
  
  const deck = [];

  function importAll(r) {
    r.keys().forEach((item, index) => {
      var image = item.replace("./","")
      deck.push({
        value : valueMapping(image.split("_of_")[0]),
        type : image.split("_of_")[1].replace(".svg",""),
        img:  require("./assets/poker/"+image),
        isSelected: false
      })
    });
  }
   
  importAll(require.context('./assets/poker', false, /\.(png|jpe?g|svg)$/));
  //shuffle
  for(let i =deck.length - 1; i > 0; i--){
    let j = Math.floor(Math.random() * (i + 1))
    var temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }  

  return deck
}

function valueMapping(str){
  switch(str){
    case "ace":
      return 1;
    case "jack":
    case "queen":
    case "king":
      return 10;
    default:
      return parseInt(str);

  }
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
  var stageNumber = 5;
  const [deck,setDeck] = useState(initialize());
  const [stages,setStages] =  useState([[],[],[],[],[]]);
  const [current,setCurrent] = useState(-1);
  const [pool,SetPool] = useState([]);
  const [result,setResult] = useState(0);
  const [chance,setChance] = useState(0);
  const [chanceOpen, setChanceOpen] = useState(false)
  const [openMsg, setOpenMsg] = useState({flag: false, content: "",style:"info"});

  useEffect(
    () =>{
      if(stages.length == 0){
        
      }
    } 
  ,stages)

  function deleteCard(){
    if(chance != 0){
      if(stages[current].every((item) => item.isSelected == false)){
        let i = Math.floor(Math.random() * (stages.length))
        deck.splice(Math.floor(Math.random() * (deck.length)), 0,  stages[i][0])
        stages[i].splice(0,1)
        if(stages[i].length == 0){
            
          stages.splice(i,1)
          if(current == 1){
            const newCurrent = (current - 1) % stageNumber;
            setCurrent(newCurrent)
          }
          setOpenMsg({flag: true, content: "Stage cleared",style:"success"});
        }
        setChance(chance - 1)
        
      }else{
        setOpenMsg({flag: true, content: "Please unselect the card(s)",style:"warning"});
      }
    }else{
      setOpenMsg({flag: true, content: "You do not have delete chance",style:"warning"});
    }
      

  }
  
  function nextCard(){
    stageNumber = stages.length
    if(deck.length > 0){
      // clear selected card 
      if( current >= 0 ){
        var newStages = [...stages]
        //newStages = newStages.map( (stage, level) => level == current ?stage.map((cd) => cd.isSelected = false): stage)
        for(var i = 0; i < newStages[current].length; i++){
          newStages[current][i].isSelected = false
        }
        //console.log(newStages)
        setStages(newStages)
      }
      const newCurrent = (current + 1) % stageNumber;
      setCurrent(newCurrent)
      stages[newCurrent].push(deck.shift())
      if(deck.length == 25 && !chanceOpen){
        setChance(5)
        setChanceOpen(true)
        setOpenMsg({flag: true, content: "Thanks God! you have 5 chance of deletion",style:"success"});
      }
    }else{
      setResult(-1)
      setOpenMsg({flag: true, content: "Game Over", style:"error"});
    }
    //console.log(deck)
  }

  function handleClose(event, reason){
    if (reason === 'clickaway') {
      return;
    }

    setOpenMsg({flag: false, content: "", style:"info"});
  }


  function handleStatus(card, index, level){
    const isClickable = current == level && (index < 2 || index > stages[current].length - 3) 
    if(isClickable){
      var newStages = [...stages]
      newStages[current][index].isSelected = !newStages[current][index].isSelected
      setStages(newStages);
      
      handleCard(card);
         
        

        
    }
    
  }


  function handleCard(card){
    console.log(card)
    if(!card.isSelected){
      SetPool(pool.filter( (target) => { return target.value != card.value && target.type != card.type} ))
    }else{     
      var newPool = [...pool]
      newPool.splice(0,0,card)
      SetPool(newPool)
      console.log(newPool)

      if(newPool.length  == 3){
        const ttl = newPool.reduce((accum, cur) => accum + cur .value,0)
        if(ttl % 10 == 0){
          console.log("Clear")
          
          
          

          //remove cards in field
          // var newStages = [...stages]
          // var newStage = stages[current].filter((el) => !newPool.includes(el))
          // newStages[current] = [...newStage]
          // //newStages.map((st, idx) => st = idx == current? stages[current].filter((el) => newPool.includes(el)): st)
          // //var newStage = stages[current].filter((el) => !newPool.includes(el))
          // const temp = [...newStages]
          // console.log(temp)
          // setStages(temp);

          var newStages = [...stages]; // Create a copy of each element in stages
          //var newStage = stages[current].filter((el) => !newPool.includes(el));
          //var newStages2= newStage.map((stage, index) =>{stage = index == current? newStage :stage});
          for(var i = 0; i < newPool.length; i++){
            const tptr = newStages[current].findIndex((item) => item == newPool[i])
            if(tptr > -1){
              newStages[current].splice(tptr,1)
            }
          }
          if(newStages[current].length == 0){
            
            newStages.splice(current,1)
            const newCurrent = (current - 1) % stageNumber;
            setCurrent(newCurrent)
            setStages(newStages)
            setOpenMsg({flag: true, content: "Stage cleared",style:"success"});
          }
          
          //put into the deck
          newPool.forEach((newCard) => {
            newCard.isSelected = false;
            deck.splice(Math.floor(Math.random() * (deck.length)), 0,  newCard)
          })
          
          if(newStages.length == 0){
            setOpenMsg({flag: true, content: "You win this game!!",style:"success"});
          }

        }else{
          var newStages = [...stages]
          //newStages = newStages.map( (stage, level) => level == current ?stage.map((cd) => cd.isSelected = false): stage)
          for(var i = 0; i < newStages[current].length; i++){
            newStages[current][i].isSelected = false
          }
          //console.log(newStages)
          setStages(newStages)
          setOpenMsg({flag: true, content: "Sum is not equal to 10, 20 or 30",style:"warning"});
        }
        SetPool([])
      }
    }
  }

  return (
    <div className="App">
        <Snackbar open={openMsg.flag} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={openMsg.style}>
            {openMsg.content}
          </Alert>
        </Snackbar>
        <Card className="info-board" container direction="row">
          <Typography gutterBottom variant="h4" component="h4">
            Five Stages
          </Typography>
          <CardContent>
            <Typography gutterBottom variant="h6" component="h6">
              How to play:
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <ol>
                <li>There are 5 stages</li>
                <li>Press "Next Card" to send to the current stages, then it performs to the next stage after players clicking the "Next Card" button.</li>
                <li>Players can pick three cards from the first two and the last two cards in the current stage. If the sum of these three is divisible by 10, these three cards will put into the deck</li>
                <li>If there is no card in the stage after players picking the card, the stage will be cleared</li>
                <li>If all stages are cleared, Player will win this game.</li>
                <li>If there is no card in deck, Player will lose this game.</li>
                <li>After the number of card in deck reaches 25, Player have 5 chance of deleting the head card in a random stage</li>
              </ol>
            </Typography>
            <Typography gutterBottom variant="h6" component="h6">
              Card number in deck: <span className={deck.length <= 5? "danger":""}>{ deck.length }</span>
            </Typography>
            <Typography gutterBottom variant="h6" component="h6">
              Current stage: { current  +1}
            </Typography>
            <Typography gutterBottom variant="h6" component="h6">
              Current chance count: { chance }
            </Typography>
            <Typography gutterBottom variant="h6" component="h6">
              Time: <Timer result={result}/>
            </Typography>

          </CardContent>
          <CardActions>
            <Button onClick={nextCard} size="large" color="primary" >next card</Button>
            <Button onClick={deleteCard} size="large" color="secondary" >delete Card</Button>
          </CardActions>
        </Card>

        <Grid
  container
  direction="row"
  justifyContent="center"
  alignItems="flex-start"
 spacing={2}>

          {//handleStatus(card,index, level)
            
            stages.map((stage, level) => {
              {
                return(
                  <Grid item direction="column">
                    {
                      stage.map((card, index) =>{
                        return (
                          <div onClick={() => handleStatus(card,index, level)}>
                          <Poker className="stage-card" key={index} value={card} onClick={() => handleStatus(card,index, level)}/>
                          </div>
                        )
                      })
                    }
                  </Grid>
                )
              }
              
            })
          }
        </Grid>
        

     
        
   
    </div>
  );
}

export default App;
