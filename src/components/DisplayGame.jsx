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

    useEffect(() => {
        let timer = setTimeout(() => {
            setTimePerLevel((time) => time - 1);
        }, 1000)

        if (timePerLevel === 0){
            clearTimeout(timer);
            setGameOver(() => true)
        }

        gameOver && clearTimeout(timer);

        pause && clearTimeout(timer);

        return () => clearTimeout(timer);
    });

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
        <div className="GameDisplay-wrapper">
            {!gameOver? 
                <div>
                    {difficulty !== ''? <div className="GameDisplay">
                        <div className="GameDisplay-header">
                            {!pause? <div>
                            <p>Score: <span>{score}</span></p>
                            <p>You have <span>{timePerLevel}</span> seconds left</p>
                            <p>You choose: <span>{difficulty}</span></p>
                            <p>High Score: <span>{highScore}</span></p>
                            <p>Game Level: <span>{gameLevel}</span></p> </div> : 
                            <span>Game is currently paused. Click the button to resume</span> }
                            <button onClick={() => setPause(!pause)}>{!pause? "Pause Game" : "Resume game"}</button>
                        </div>
                        <div className="emoji-display">{animals.map(animal => 
                            <div key={animal.codes.toString()} >
                                <p className="emoji-char" onClick={e => handleEmojiClick(animal)}>{animal.char}</p>
                                <p className="emoji-name">{animal.name}</p>
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