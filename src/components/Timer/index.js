import { useState, useEffect } from 'react';

function Timer(props){


    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const start = Date.now()

    function getTime(){
        const time = Date.now() - start
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    }
  

    useEffect(() => {
        if(props.result === -1){
            return () => clearInterval(0);
        }else{
            const interval = setInterval(() => getTime(), 1000)
            return () => clearInterval(interval);
        }
    
        
      }, []);

    return (
        
        <>{hours}h {minutes}m {seconds}s</>
        
    )
}

export default Timer;