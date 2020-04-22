import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LazyLoad from "react-lazyload";

/* importing Components */
import Pokemon from "./Pokemon";
import Button from "./Button";
import PokePage from "./PokePage";

//fetch pokemon list
const getPokemon = async (url) => {
  const response = await fetch(url);
  const data = response.json();
  return data;
};

class PokemonData extends Component {
  /* to check if component is mounted */
  _isMounted = false;

  constructor() {
    super();
    this.state = {
      isLoading: true,
      pokeData: [],
      url: `https://pokeapi.co/api/v2/pokemon`,
      nextUrl: "",
      prevUrl: "",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    this._isMounted = true;
    const data = await getPokemon(this.state.url);
    if (this._isMounted) {
      this.setState({
        isLoading: false,
        pokeData: data["results"],
        nextUrl: data["next"],
        prevUrl: data["previous"],
      });
    }
  }

  async handleClick(e) {
    this._isMounted = false;
    if (e.target.value === "prev") {
      this.setState({ url: this.state.prevUrl });
    } else {
      this.setState({ url: this.state.nextUrl });
    }
  }

  async componentDidUpdate(prevState) {
    this._isMounted = true;
    if (prevState.url !== this.state.url && this._isMounted) {
      const data = await getPokemon(this.state.url);
      this.setState({
        pokeData: data["results"],
        nextUrl: data["next"],
        prevUrl: data["previous"],
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className="poke-container" style={pokeContainerStyle}>
              {this.state.pokeData &&
                this.state.pokeData.map((poke) => (
                  <Pokemon key={poke.name} name={poke.name} url={poke.url} />
                ))}
            </div>
            <Button
              prevUrl={this.state.prevUrl}
              handleClick={this.handleClick}
            />
          </>
        )}
      </React.Fragment>
    );
  }
}

const pokeContainerStyle = {
  listStyle: "none",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "space-between",
  justifyContent: "center",
};

export default PokemonData;
