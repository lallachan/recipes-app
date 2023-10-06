import React from 'react';
import {Button} from "antd";


interface Props {
    instructions: string[]
    setInstructions: (instructions: string[]) => void;
}

const Results = ({instructions, setInstructions}:Props) => {

    const handleRemoveInstruction = (index: number) => {
        const filter = instructions.filter((i, indx) => indx !== index)
        setInstructions(filter)
    }

    return (
        <div>
            <h1>Instructions:</h1>
            <ul>{instructions.map((i, index) => <li>{i}<Button
                onClick={handleRemoveInstruction.bind(this, index)}>x</Button></li>)}</ul>
        </div>
    );
};

export default Results;
