import { useRef, useState } from "react";

const Stopwatch:React.FC = () => {
    const [startTime, setStartTime] = useState<number | null>(null);
    const [now, setNow] = useState<number | null>(null);

    const timerRef = useRef<number | null>(null);

    function handleStart(){
        setStartTime(Date.now());
        setNow(Date.now())

        // clear any existing interval
        if(timerRef.current !== null){
            clearInterval(timerRef.current);
        }

        timerRef.current = setInterval(()=>{
            setNow(Date.now());
        }, 10);
    }

    function handleStop(){
        if(timerRef.current !== null){
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }

    let secondsElapsed = 0;
    if(startTime !== null && now !== null){
        secondsElapsed = (now - startTime) / 1000;
    }

    return (
    <div>
      <h1>Time elapsed: {secondsElapsed.toFixed(3)}s</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
}

export default Stopwatch;