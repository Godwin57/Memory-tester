import { Link } from "react-router-dom";

function Congratulations() {
    return (
        <div className="Congratulations">
            <h2>Congratulations {name}</h2>
            <p>You've proven that you're a true winner. After you feat of defeating the animals in a mental game,
                humans crown you there supreme king for saving their race from being wiped out from existence.
            </p>

            <p>But will this victory last long before the animals attack again?</p>
            <button><Link to='difficulty'>Click here to play again</Link></button>
        </div>
    );
}

export default Congratulations;