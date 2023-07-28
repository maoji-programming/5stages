import { useEffect, useState } from 'react';
import "./styles.css"

function Poker(props){   

  
    return (
        <div style={{height:50}} className="container">
            <img className={props.value.isSelected ? "selected" : "unselected"} src={props.value.img} alt={props.value.value+"-"+props.value.type} ></img> 
        </div>
    )

}
export default Poker;