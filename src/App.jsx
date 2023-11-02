import { useState } from "react";
import './App.css'
import WelcomePage from "./components/WelcomePage";
import DisplayGame from "./components/DisplayGame";
import SelectDifficulty from "./components/SelectDifficulty";
import {animalEmojis} from "./assets/Emojis";

function App() {
    const [showGame, setShowGame] = useState(false);
    const [name, setName] = useState('');
    const [difficulty, setDifficulty] = useState('');

    return (
        <SelectDifficulty difficulty={difficulty} setDifficulty={setDifficulty}/>
        // <>{!showGame?
        //     <WelcomePage setShowGame={setShowGame} name={name} setName={setName}/> :
        //     <DisplayGame animalEmojis={animalEmojis}/>}
        // </>
    );
}

export default App;