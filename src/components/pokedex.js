import React, {Component} from 'react';
import PokeData from './pokedata';

const pokeNum = 55;
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};
const main_types = Object.keys(colors);

export default class PokeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true
    };
  }
  
  async componentDidMount() {
    const data = [];
    for(var i = 1; i <= pokeNum; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      const res = await fetch(url);
      const pokemon = await res.json();
      const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
      const img = `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`;
      let poke_type = pokemon.types.map(t => t.type.name);
      const type = main_types.find(type => poke_type.indexOf(type) > -1);
      const pokemonObj = {
          name, 
          type,
          img,
          color: colors[type]
    };
      data.push(pokemonObj);
    }
    this.setState({
        data: data, 
        isLoading: false
    });
  }
  
  render() {
    return (
      <div>
          {this.state.isLoading ? 
          <h1 className="loading">Loading...</h1> : 
          <PokeData data={this.state.data} />
          }
      </div>
    );
  }
}
