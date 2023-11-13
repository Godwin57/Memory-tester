import { useState, useEffect } from "react";
import './App.css'
import WelcomePage from "./components/WelcomePage";
import DisplayGame from "./components/DisplayGame";
import SelectDifficulty from "./components/SelectDifficulty";
import {animalEmojis} from "./assets/Emojis";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import { randomlyBuildArr } from "./components/gameLogic";

function App() {
    const [name, setName] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [animalEmoji, setAnimalEmoji] = useState({});

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

    const router = createBrowserRouter([
        {
            path: '/',
            element: <WelcomePage name={name} setName={setName} animalEmoji={animalEmoji.char}/>,
            errorElement: <ErrorPage />
        },

        {
            path: 'difficulty',
            element: <SelectDifficulty difficulty={difficulty} name={name} setDifficulty={setDifficulty}
            animalEmoji={animalEmoji.char}/>,
        },

        {
            path: 'gameDisplay',
            element: <DisplayGame animalEmojis={animalEmojis} score={score} setScore={setScore}
                highScore={highScore} setHighScore={setHighScore} difficulty={difficulty} name={name}/>
        }
    ])

    return (
        <RouterProvider router={router}/>
    );
}

export default App;