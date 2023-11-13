import { Link } from "react-router-dom";

function SelectDifficulty({name, difficulty, setDifficulty}) {
    const handleClick = e => {
        e.preventDefault();
        if(!difficulty) alert("You have to select a difficulty level to proceed");
        return;
    }

    return (
        <div className="Difficulty">
            {name? 
            <div>
                <h1>Hi, {name}</h1>
                <form>
                    <input type="radio" name = 'diff' value={'easy'} onChange={e => setDifficulty(e.target.value)}/>Easy
                    <input type="radio" name = 'diff' value={'medium'} onChange={e => setDifficulty(e.target.value)}/>Medium
                    <input type="radio" name = 'diff' value={'hard'} onChange={e => setDifficulty(e.target.value)}/>Hard

                    {difficulty !== ''? <button onClick={e => handleClick(e)}><Link to="/gameDisplay">Submit choice</Link></button> :
                    <button onClick={e => handleClick(e)}>Submit choice</button>}
                </form>
            </div>:
            <div>
                <p>You can't proceed without giving  us your name.</p>
                <button><Link to='/'>Click to go to Home</Link></button>
            </div>
            }
        </div>
    );
}

export default SelectDifficulty;