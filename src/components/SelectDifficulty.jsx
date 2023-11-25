import { Link } from "react-router-dom";

function SelectDifficulty({name, difficulty, setDifficulty, animalEmoji}) {

    const handleClick = e => {
        e.preventDefault();
        if(!difficulty) alert("You have to select a difficulty level to proceed");
        return;
    }

    return (
        <div className="Difficulty">
            {name? 
            <div className="first">
                <h1>Hi, <span>{name}</span></h1>
                <p className="animalImage">{animalEmoji}</p>
                <form>
                    <div className="inputs">
                        <div><input type="radio" name = 'diff' value={'easy'} onChange={e => setDifficulty(e.target.value)}/>Easy</div>
                        <div><input type="radio" name = 'diff' value={'medium'} onChange={e => setDifficulty(e.target.value)}/>Medium</div>
                        <div><input type="radio" name = 'diff' value={'hard'} onChange={e => setDifficulty(e.target.value)}/>Hard</div>
                    </div>

                    {difficulty !== ''? <Link to="/gameDisplay"><button>Continue</button></Link> :
                    <button onClick={e => handleClick(e)}>Continue</button>}
                </form>
            </div>:
            <div className="second">
                <p>You can't proceed without a name!!!</p>
                <Link to='/'><button>Click to go to Home</button></Link>
            </div>
            }
        </div>
    );
}

export default SelectDifficulty;