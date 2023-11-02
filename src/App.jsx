import { useEffect, useState } from "react";
import {animalEmojis} from "./assets/Emojis";
import { Difficulty } from "./components/gameLogic";

function App() {
    const {easy, medium, hard} = Difficulty;
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        setAnimals(() => medium(animalEmojis, 10));
    }, [])

    return (
        <>
            {animals.map(animal => 
                <div key={animal.code}>
                    <p>{animal.char}</p>
                    <p>{animal.name}</p>
                </div>
            )}
            <p>Yeah</p>
        </>
    );
}

export default App;