import { Link } from "react-router-dom";
import { randomlyBuildArr } from "./gameLogic";
import { useEffect, useState } from "react";

function WelcomePage({name, setName, animalEmojis}) {
    const [animalEmoji, setAnimalEmoji] = useState({});

    const handleClick = e => {
        e.preventDefault();
        if(!name || name.length <= 3){
            alert("Please enter a name of three or more characters");
            return;
        }
    }

    useEffect(() => {
        setAnimalEmoji(_ => randomlyBuildArr(animalEmojis, 1)[0]);
    }, [])

    let timer;
    useEffect(() => {
        timer = setTimeout(() => {
            setAnimalEmoji(_ => randomlyBuildArr(animalEmojis, 1)[0])
        }, 5000)

        return () => clearTimeout(timer);
    });

    return (
        <div className="Welcome">
            <h1>Animal <span>Klash</span></h1>
            <p className="animalImage">{animalEmoji.char}</p>
            <div className="Input">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={10} 
                placeholder="Please enter your name here" autoFocus/>
            {name.length >= 3? (<button><Link to="difficulty">Submit</Link></button>) :
                <button onClick={(e) => handleClick(e)}>Submit</button>}
            </div>
            
        </div>
    );
}

export default WelcomePage;