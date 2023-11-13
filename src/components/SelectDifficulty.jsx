import { Link } from "react-router-dom";

function SelectDifficulty({name, setDifficulty}) {
    return (
        <>
            <h1>Hi, {name}</h1>
            <form>
                <input type="radio" name = 'diff' value={'easy'} onChange={e => setDifficulty(e.target.value)}/>Easy
                <input type="radio" name = 'diff' value={'medium'} onChange={e => setDifficulty(e.target.value)}/>Medium
                <input type="radio" name = 'diff' value={'hard'} onChange={e => setDifficulty(e.target.value)}/>Hard

                <button><Link to="/gameDisplay">Submit choice</Link></button>
            </form>
        </>
    );
}

export default SelectDifficulty;