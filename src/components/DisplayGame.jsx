import { Difficulty } from "./gameLogic";
import { useState, useEffect } from "react";
import { shuffleArray } from "./gameLogic";
import { PerLevelFeatures } from "./gameLogic";
import { Link } from "react-router-dom";
import GameOver from "./GameOver";
import Congratulations from "./Congratulations";

function DisplayGame({animalEmojis, score, setScore, highScore, setHighScore, difficulty, name}) {
    const {easy, medium, hard} = Difficulty;
    const {getCardNumberPerLevel, getGameTimePerLevel} = PerLevelFeatures;
    const [animals, setAnimals] = useState([]);
    // Reminder: use an animation when working on the game over page
    const [gameOver, setGameOver] = useState(false);
    const [gameLevel, setGameLevel] = useState(1);
    const [finishedLevel, setFinishedLevel] = useState(false);
    const [finishedGame, setFinishedGame] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [timePerLevel, setTimePerLevel] = useState(null);
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
        setTimePerLevel(() => getGameTimePerLevel(gameLevel))
    }, [gameLevel])

    useEffect(() => {
        setClickCount(count => count = 0)
    }, [finishedLevel])

    useEffect(() => {
        const unClickedAnimals = animalEmojis.map(anim => {
            return {...anim, clicked: false};
        });

        difficulty === 'easy' && setAnimals(() => easy(unClickedAnimals, getCardNumberPerLevel(gameLevel)));
        difficulty === 'medium' && setAnimals(() => medium(unClickedAnimals, getCardNumberPerLevel(gameLevel)));
        difficulty === 'hard' && setAnimals(() => hard(unClickedAnimals, getCardNumberPerLevel(gameLevel)));
    }, [finishedLevel, difficulty])

    useEffect(() => {
        if(score <= highScore) return;
        setHighScore(_ => score)
    }, [score])

    useEffect(() => {
        if (gameOver){
            setScore(score => score = 0)
        }
    }, [gameOver])


    function handleLevelChange() {
        if(clickCount === animals.length - 1){
            if(gameLevel === 5){
                setFinishedGame(finished => {finished = true});
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
            console.log("Overrr")
            setGameOver(true);
            return;
        }

        anim.clicked = true;
        setScore(score => score + 1);
        setClickCount(_ => clickCount + 1);

        setAnimals(() => shuffleArray(animals));
        handleLevelChange();
    }

    return (
        <>{!finishedGame?  
        <div>
            {!gameOver? 
                <div>
                    {difficulty !== ''? <div>
                        <p>Score: {score}</p>
                        <p>You have {timePerLevel} seconds left</p>
                        <p>You choose: {difficulty}</p>
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
                        <Link to="/difficulty"><button>Take this shortcut back to the difficulty page</button></Link>
                    </div>
                    }
                </div>:
                <GameOver />
                }
            </div> :
            <Congratulations />
        }
        </>
    );
}

export default DisplayGame;