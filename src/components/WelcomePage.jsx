function WelcomePage({setShowGame, name, setName}) {
    const handleClick = () => {
        if (!name) {
            alert("Please enter your name");
            return;
        }
        setShowGame(true);
    }

    return (
        <>
            <h1>This is the welcome page of this app</h1>

            <p>What is your name
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </p>
            <button onClick={() => handleClick()}>Show game?</button>
        </>
    );
}

export default WelcomePage;