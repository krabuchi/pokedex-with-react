import React from 'react';

function PokeData(props) {
    const pokeData = props.data.map(d => (
        <li key={d.id} className="poke" style={{backgroundColor: d.color}}>
            <div className="image-holder"><img src={d.img} alt={d.name}/></div>
            <h3>{d.name}</h3>
            <small className='type'>Type: {d.type}</small>
        </li>
    ));
    return (
        <ul className="list-of-pokemon">{pokeData}</ul>
    );
}

export default PokeData;