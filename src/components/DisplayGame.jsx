import { Difficulty } from "./gameLogic";
import { useState, useEffect } from "react";
import { shuffleArray } from "./gameLogic";

function DisplayGame({animalEmojis, score, setScore, highScore, setHighScore}) {
    const {easy, medium, hard} = Difficulty;
    const [animals, setAnimals] = useState([]);
    // Reminder: use an animation when working on the game over page
    const [gameOver, setGameOver] = useState(false);
    const [gameLevel, setGameLevel] = useState(1);
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        setAnimals(() => easy(animalEmojis, 10));
    }, [])

    useEffect(() => {
        if(score < highScore) return;
        setHighScore(_ => score)
    }, [score])

    function handleEmojiClick(anim) {
        if (anim.clicked) {
            setGameOver(true);
            console.log("Game over")
            return;
        }
        if (gameOver){
            console.log("Stop clicking me! You're already out of the game");
            return;
        }

        anim.clicked = true;
        setScore(score => score + 1)
        setClickCount(_ => clickCount + 1)
        console.log("I've been assaulted");

        setAnimals(() => shuffleArray(animals));
    }

    return (
        <>
            <p>Score: {score}</p>
            <p>High Score: {highScore}</p>
            <p>Game Level: {gameLevel}</p>
            <div>{animals.map(animal => 
                <div key={animal.codes.toString()} >
                    <p style={{'cursor' : 'pointer'}} onClick={e => handleEmojiClick(animal)}>{animal.char}</p>
                    <p>{animal.name}</p>
                </div>
            )}
            </div>
        </>
    );
}

export default DisplayGame;