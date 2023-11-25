import { Link } from "react-router-dom";

function GameOver({score, highScore}) {
    return (
        <div className="GameOver">
            <h1>Game over</h1>
            {score > highScore? (<p>Although your fellow humans are angry with you for losing against the animals, they're 
                quite happy that your attempt is better than the attempt their previous champion made. Congrats on being
                their new champion.
            </p>) : (<p>You're a disgrace! Your fellow humans are highly disappointed that you failed to defeat animals 
                in an ordinary brain game. They almost stoned you to death but you were rescued by the current game 
                champion. You owe him a lot!
            </p>)}
            <p>But always remember that you disappointed humanity and lost an ordinary mental war against ANIMALS!!</p>
            <p>That's enough shame for a person's lifetime!</p>
            <Link to='/'><button>Click here to go home</button></Link>
            <Link to='/difficulty'><button>Click here to select difficulty and start the war against the animals all over</button></Link>
        </div>
    );
}

export default GameOver;