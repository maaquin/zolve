import React, { useState } from 'react';

import aceite from '../../assets/whatZolve/aceite.png';
import agua from '../../assets/whatZolve/agua.png';
import bateria from '../../assets/whatZolve/bateria.png';
import carro from '../../assets/whatZolve/carro.png';
import choque from '../../assets/whatZolve/choque.png';
import gasolina from '../../assets/whatZolve/gasolina.png';
import llanta from '../../assets/whatZolve/llanta.png';
import moto from '../../assets/whatZolve/moto.png';

const options = [
    { id: 'aceite', name: 'Lack of oil', img: aceite },
    { id: 'agua', name: 'Lack of water in engine', img: agua },
    { id: 'bateria', name: 'Dead battery', img: bateria },
    { id: 'carro', name: 'Something in the car', img: carro },
    { id: 'choque', name: 'Vehicle collision', img: choque },
    { id: 'gasolina', name: 'Out of fuel', img: gasolina },
    { id: 'llanta', name: 'Flat tire', img: llanta },
    { id: 'moto', name: 'Something in the motorcycle', img: moto }
];

export const WhatZolve = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSelect = (id) => {
        setSelectedOptions(prevSelected => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter(optionId => optionId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    return (
        <div className="home-container">
            <span className="buscar-text">What's the problem?</span>
            <br></br>
            <l>Please select from this list the possible problems your vehicle is experiencing, you can select several options</l>
            <div className="what-zolve-container">
                {options.map(option => (
                    <div
                        key={option.id}
                        className={`option-item ${selectedOptions.includes(option.id) ? 'selected' : ''}`}
                        onClick={() => handleSelect(option.id)}
                    >
                        <img src={option.img} alt={option.name} />
                        <p>{option.name}</p>
                    </div>
                ))}
            </div>
            <div className="btns">
                <button className="btn-user zolve-btn" onClick={() => handleUserTypeSelection()}>
                    Continue
                </button>
            </div>
        </div>
    );
};