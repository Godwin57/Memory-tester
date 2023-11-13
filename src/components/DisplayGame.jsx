import { Difficulty } from "./gameLogic";
import { useState, useEffect } from "react";
import { shuffleArray } from "./gameLogic";
import { PerLevelFeatures } from "./gameLogic";
import { Link } from "react-router-dom";

function DisplayGame({animalEmojis, score, setScore, highScore, setHighScore, difficulty}) {
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
        setTimePerLevel(() => getGameTimePerLevel(gameLevel, difficulty))
    }, [gameLevel, difficulty])

    useEffect(() => {
        difficulty === 'easy' && setAnimals(() => easy(animalEmojis, getCardNumberPerLevel(gameLevel)));
        difficulty === 'medium' && setAnimals(() => medium(animalEmojis, getCardNumberPerLevel(gameLevel)));
        difficulty === 'hard' && setAnimals(() => hard(animalEmojis, getCardNumberPerLevel(gameLevel)));
    }, [finishedLevel, difficulty])

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
        <>  {difficulty !== ''? <div>
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
            </div> : 
            <div>
                <p>To play game, you have to choose a difficulty first</p>
                <button><Link to="/difficulty">Take this shortcut back to the difficulty page</Link></button>
            </div>
            }
        </>
    );
}

export default DisplayGame;