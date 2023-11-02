function WelcomePage({setShowGame}) {
    return (
        <>
            <h1>This is the welcome page of this app</h1>
            <button onClick={() => setShowGame(true)}>Show game?</button>
        </>
    );
}

export default WelcomePage;