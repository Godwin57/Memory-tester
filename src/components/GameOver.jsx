import { Link } from "react-router-dom";

function GameOver({gameOver, score, highScore}) {
    return (
        <>
            <h1>Game over</h1>
            {score > highScore? (<p>Although your fellow humans are angry with you for losing against the animals, they're 
                quite happy that your attempt is better than the attempt their previous champion made. Congrats on being
                their new champion.
            </p>) : (<p>You're a disgrace! Your fellow humans are highly dissappointed that you failed to defeat animals 
                in an ordinary brain game. They almost stoned you to death but you were rescued by the current game 
                champion. You owe him a lot!
            </p>)}
            <p>You've disappointed humanity and lost the war against the animals.</p>
            <Link to='/'>Click here to go home</Link>
            <Link to='/difficulty'>Click here to select difficulty and start the war against the animals all over</Link>
        </>
    );
}

export default GameOver;