import { useState } from "react";
import './App.css'
import WelcomePage from "./components/WelcomePage";
import DisplayGame from "./components/DisplayGame";
import SelectDifficulty from "./components/SelectDifficulty";
import {animalEmojis} from "./assets/Emojis";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";

function App() {
    const [name, setName] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    const router = createBrowserRouter([
        {
            path: '/',
            element: <WelcomePage name={name} setName={setName}/>,
            errorElement: ErrorPage
        },

        {
            path: 'difficulty',
            element: <SelectDifficulty difficulty={difficulty} name={name} setDifficulty={setDifficulty}/>,
        },

        {
            path: 'gameDisplay',
            element: <DisplayGame animalEmojis={animalEmojis} score={score} setScore={setScore}
                highScore={highScore} setHighScore={setHighScore} difficulty={difficulty}/>
        }
    ])

    return (
        <RouterProvider router={router}/>
    );
}

export default App;