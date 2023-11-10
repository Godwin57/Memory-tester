import { Difficulty } from "./gameLogic";
import { useState, useEffect } from "react";
import { shuffleArray } from "./gameLogic";
import { PerLevelFeatures } from "./gameLogic";

function DisplayGame({animalEmojis, score, setScore, highScore, setHighScore}) {
    const {easy, medium, hard} = Difficulty;
    const {getCardNumberPerLevel, getGameTimePerLevel} = PerLevelFeatures;
    const [animals, setAnimals] = useState([]);
    // Reminder: use an animation when working on the game over page
    const [gameOver, setGameOver] = useState(false);
    const [gameLevel, setGameLevel] = useState(1);
    const [finishedLevel, setFinishedLevel] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [timePerLevel, setTimePerLevel] = useState(0);

    useEffect(() => {
        setTimePerLevel(() => getGameTimePerLevel(gameLevel, 'easy'))
    }, [gameLevel])

    useEffect(() => {
        setAnimals(() => easy(animalEmojis, getCardNumberPerLevel(gameLevel)));
    }, [finishedLevel])

    useEffect(() => {
        if(score < highScore) return;
        setHighScore(_ => score)
    }, [score])

    function handleLevelChange() {
        if(clickCount === animals.length - 1){
            if(gameLevel === 5){
                console.log("You win. You're really a winner");
                return;
            }
            setGameLevel(_ => gameLevel + 1)
            setFinishedLevel(_ => true);
        }
    }

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
        handleLevelChange();
    }

    return (
        <>
            <p>Score: {score}</p>
            <p>You have {timePerLevel} seconds left</p>
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