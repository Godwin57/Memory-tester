import { Link } from "react-router-dom";

function SelectDifficulty({name, difficulty, setDifficulty, animalEmoji, bgAnimalEmoji}) {

    const handleClick = e => {
        e.preventDefault();
        if(!difficulty) alert("You have to select a difficulty level to proceed");
        return;
    }

    return (
        <div className="Difficulty">
            <div className="difficulty-inner">
                {name? 
                <section className="first">
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
                </section>:
                <section className="second">
                    <p>You can't proceed without a name!!!</p>
                    <Link to='/'><button>Click to go to Home</button></Link>
                </section>
                }
            </div>
            <p className="under-emoji first-emoji">{bgAnimalEmoji}</p>
            <p className="under-emoji second-emoji">{bgAnimalEmoji}</p>
            <p className="under-emoji third-emoji">{bgAnimalEmoji}</p>
        </div>
    );
}

export default SelectDifficulty;