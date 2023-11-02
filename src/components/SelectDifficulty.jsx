function SelectDifficulty({name, setDifficulty}) {
    return (
        <>
            <p>Hi, {name}</p>
            <form>
                <input type="radio" name = 'diff' value={'easy'} onChange={e => setDifficulty(e.target.value)}/>Easy
                <input type="radio" name = 'diff' value={'medium'} onChange={e => setDifficulty(e.target.value)}/>Medium
                <input type="radio" name = 'diff' value={'hard'} onChange={e => setDifficulty(e.target.value)}/>Hard
            </form>
        </>
    );
}

export default SelectDifficulty;