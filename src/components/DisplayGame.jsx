import { Difficulty } from "./gameLogic";
import { useState, useEffect } from "react";
import { shuffleArray } from "./gameLogic";
import { PerLevelFeatures } from "./gameLogic";
import { Link } from "react-router-dom";
import GameOver from "./GameOver";

function DisplayGame({animalEmojis, score, setScore, highScore, setHighScore, difficulty}) {
    const {easy, medium, hard} = Difficulty;
    const {getCardNumberPerLevel, getGameTimePerLevel} = PerLevelFeatures;
    const [animals, setAnimals] = useState([]);
    // Reminder: use an animation when working on the game over page
    const [gameOver, setGameOver] = useState(false);
    const [gameLevel, setGameLevel] = useState(1);
    const [finishedLevel, setFinishedLevel] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [timePerLevel, setTimePerLevel] = useState();
    const [pause, setPause] = useState(false)

    let timer;
    useEffect(() => {
        timer = setTimeout(() => {
            setTimePerLevel((time) => time - 1);
        }, 1000)

        if (timePerLevel === 0){
            clearTimeout(timer);
            setGameOver(() => true)
        }

        gameOver && clearTimeout(timer);

        return () => clearTimeout(timer);
    })

    useEffect(() => {
        pause && clearTimeout(timer)
    }, [pause])

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
        if(pause) {
            alert("You can't do anything, the game is currently paused")
            return;
        }

        if (anim.clicked) {
            setGameOver(true);
            console.log("Game over")
            return;
        }
        if (gameOver){
            alert("Stop clicking me! You're already out of the game");
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
        <>  {!gameOver? 
            <div>
                {difficulty !== ''? <div>
                    <p>Score: {score}</p>
                    <p>You have {timePerLevel} seconds left</p>
                    <p>You c{difficulty}</p>
                    <p>High Score: {highScore}</p>
                    <p>Game Level: {gameLevel}</p>
                    <button onClick={() => setPause(!pause)}>{!pause? "Pause Game" : "Resume game"}</button>
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
            </div>:
            <GameOver />
            }
        </>
    );
}

export default DisplayGame;