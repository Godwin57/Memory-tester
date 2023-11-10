function WelcomePage({name, setName}) {
    const handleClick = () => {
        if (!name) {
            alert("Please enter your name");
            return;
        }
    }

    return (
        <>
            <h1>This is the welcome page of this app</h1>

            <p>What is your name
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </p>
            {/* This button should contain a link. It'd be implemented when I learn routing */}
            <button onClick={() => handleClick()}>Submit</button>
        </>
    );
}

export default WelcomePage;