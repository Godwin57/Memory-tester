import { Difficulty } from "./gameLogic";
import { useState, useEffect } from "react";

function DisplayGame({animalEmojis}) {
    const {easy, medium, hard} = Difficulty;
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        setAnimals(() => easy(animalEmojis, 10));
    }, [])

    return (
        <>
            <div>{animals.map(animal => 
                <div key={animal.code}>
                    <p>{animal.char}</p>
                    <p>{animal.name}</p>
                </div>
            )}
            </div>
        </>
    );
}

export default DisplayGame;