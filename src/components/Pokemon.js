import React, { Component } from "react";
import { Link } from "react-router-dom";
import LazyLoad from 'react-lazyload';

const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5"
};

const main_types = Object.keys(colors);

class Pokemon extends Component {
  state = {
    name: "",
    imgUrl: "",
    index: "",
    type: "",
    color: ""
  };

  async componentDidMount() {
    const { name, url } = this.props;
    const index = url.split("/")[url.split("/").length - 2];
    const imgUrl = `https://pokeres.bastionbot.org/images/pokemon/${index}.png`;

    /*getting pokemon data */
    const res = await fetch(url);
    const data = await res.json();
    const pokeType = data.types.map(t => t.type.name);
    const type = main_types.find(t => pokeType.indexOf(t) > -1);
    const color = colors[type];

    this.setState({ name, imgUrl, index, type, color });
  }

  render() {
    const { name, imgUrl, index, type, color } = this.state;
    return (
      <Link to={`/pokemon/${index}`} style={style}>
        <div className="pokemon" style={{ backgroundColor: `${color}` }}>
          <div className="img-container">
            <LazyLoad once={true}>
              <img src={imgUrl} alt={name} />
            </LazyLoad>
          </div>
          <div className="info">
            <span className="number">{index.toString().padStart(3, "0")}</span>
            <h3 className="name">
              {name
                .toLowerCase()
                .split("-")
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(" ")}
            </h3>
            <small className="type">
              Type: <span>{type}</span>
            </small>
          </div>
        </div>
      </Link>
    );
  }
}

const style = {
  textDecoration: "none",
  color: "black"
};

export default Pokemon;
