import { Link } from "react-router-dom";

function WelcomePage({name, setName}) {
    const handleClick = e => {
        e.preventDefault();
        if(!name){
            alert("Please enter a name");
            return;
        }
    }

    return (
        <div className="Welcome">
            <h1>This is the welcome page of this app</h1>

            <p>What is your name
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={10} 
                    placeholder="Max of 10 characters"/>
            </p>
            {/* This button should contain a link. It'd be implemented when I learn routing */}
            {name? (<button><Link to="difficulty">Submit</Link></button>) : 
                <button onClick={(e) => handleClick(e)}>Submit</button>}
        </div>
    );
}

export default WelcomePage;