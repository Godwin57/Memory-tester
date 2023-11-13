import { Link } from "react-router-dom";

function WelcomePage({name, setName, animalEmoji}) {
    const handleClick = e => {
        e.preventDefault();
        if(!name || name.length <= 3){
            alert("Please enter a name of three or more characters");
            return;
        }
    }

    return (
        <div className="Welcome">
            <h1>Animal <span>Klash</span></h1>
            <p className="animalImage">{animalEmoji}</p>
            <div className="Input">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={10} 
                placeholder="Please enter your name here" autoFocus/>
            {name.length >= 3? (<Link to="difficulty"><button>Submit</button></Link>) :
                <button onClick={(e) => handleClick(e)}>Submit</button>}
            </div>
            
        </div>
    );
}

export default WelcomePage;