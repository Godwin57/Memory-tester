import { Link } from "react-router-dom";

function WelcomePage({name, setName}) {

    const handleClick = (e) => {
        if (!name) {
            e.preventDefault();
            alert("Please enter your name");
            return;
        }
    }

    return (
        <div className="Welcome">
            <h1>This is the welcome page of this app</h1>

            <p>What is your name
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </p>
            {/* This button should contain a link. It'd be implemented when I learn routing */}
            <button onClick={(e) => handleClick(e)}><Link to="selectDifficulty">Submit</Link></button>
        </div>
    );
}

export default WelcomePage;