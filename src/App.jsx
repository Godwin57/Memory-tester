import { useEffect, useState } from "react";
import WelcomePage from "./components/WelcomePage";
import {animalEmojis} from "./assets/Emojis";
import { Difficulty } from "./components/gameLogic";

function App() {
    const {easy, medium, hard} = Difficulty;
    const [showGame, setShowGame] = useState(false);
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        setAnimals(() => hard(animalEmojis, 10));
    }, [])

    return (
        <>{!showGame?
            <WelcomePage setShowGame={setShowGame}/> :
            <div>{animals.map(animal => 
                <div key={animal.code}>
                    <p>{animal.char}</p>
                    <p>{animal.name}</p>
                </div>
            )}
            </div>}
            <p>Yeah</p>
        </>
    );
}

export default App;