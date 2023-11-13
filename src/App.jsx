import { useState } from "react";
import './App.css'
import WelcomePage from "./components/WelcomePage";
import DisplayGame from "./components/DisplayGame";
import SelectDifficulty from "./components/SelectDifficulty";
import {animalEmojis} from "./assets/Emojis";

function App() {
    const [name, setName] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    return (
        <>
            <WelcomePage name={name} setName={setName}/>
            {/* <SelectDifficulty difficulty={difficulty} name={name} setDifficulty={setDifficulty}/>
            <DisplayGame animalEmojis={animalEmojis} score={score} setScore={setScore}
                highScore={highScore} setHighScore={setHighScore} difficulty={difficulty}/> */}
        </>
    );
}

export default App;