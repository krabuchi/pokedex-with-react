import React, { Component } from "react";
import styles from "./pokepage.module.css";

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
  normal: "#F5F5F5",
  ghost: "#d580ff",
};

const main_types = Object.keys(colors);

class PokePage extends Component {
  state = {
    name: "",
    index: "",
    imgUrl: "",
    types: [],
    description: "",
    stats: {
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      specialAttack: "",
      specialDefense: "",
    },
    heigth: "",
    weight: "",
    eggGroups: "",
    abilities: "",
    genderRatioMale: "",
    genderRatioFemale: "",
    evs: "",
    hatchSteps: "",
    color: "",
  };

  async componentDidMount() {
    const { index } = this.props.match.params;
    /* url to get pokemons*/
    const url = `https://pokeapi.co/api/v2/pokemon/${index}/`;
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${index}/`;

    //get pokemon information
    const response = await fetch(url);
    const data = await response.json();
    const name = data.name
      .toLowerCase()
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
    const imgUrl = `https://pokeres.bastionbot.org/images/pokemon/${index}.png`;

    let { hp, attack, defense, speed, specialAttack, specialDefense } = "";
    //map stats
    data.stats.map((stat) => {
      switch (stat.stat.name) {
        case "hp":
          hp = stat["base_stat"];
          break;
        case "attack":
          attack = stat["base_stat"];
          break;
        case "defense":
          defense = stat["base_stat"];
          break;
        case "speed":
          speed = stat["base_stat"];
          break;
        case "special-attack":
          specialAttack = stat["base_stat"];
          break;
        case "special-defense":
          specialDefense = stat["base_stat"];
          break;
        default:
          break;
      }
    });
    const height = Math.round((data.height * 0.328084 + 0.0001) * 100) / 100;
    const weight = (data.weight * 100) / 1000;
    const typesList = data.types.map((type) => type.type.name);
    const types = data.types
      .map((type) =>
        type.type.name
          .toLowerCase()
          .split("-")
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ")
      )
      .join(", ");
    const abilities = data.abilities
      .map((ability) => {
        return ability.ability.name
          .toLowerCase()
          .split("-")
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ");
      })
      .join(", ");
    const evs = data.stats
      .filter((stat) => (stat.effort > 0 ? true : false))
      .map((stat) => {
        return `${stat.effort} ${stat.stat.name}`
          .toLowerCase()
          .split("-")
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ");
      })
      .join(", ");

    // getting pokemon description, catchRate, egggroups, genderratio

    await fetch(speciesUrl)
      .then((res) => res.json())
      .then((data) => {
        let description = "";
        data.flavor_text_entries.some((flavor) => {
          if (flavor.language.name === "en") {
            description = flavor.flavor_text;
          }
        });
        const femaleRate = data["gender_rate"];
        const genderRatioFemale = 12.5 * femaleRate;
        const genderRatioMale = 12.5 * (8 - femaleRate);

        const catchRate = Math.round((100 / 255) * data["capture_rate"]);

        const eggGroups = data["egg_groups"]
          .map((group) => {
            return group.name
              .toLowerCase()
              .split("-")
              .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
              .join(" ");
          })
          .join(", ");

        const hatchSteps = 255 * (data["hatch_counter"] + 1);

        this.setState({
          description,
          genderRatioFemale,
          genderRatioMale,
          catchRate,
          eggGroups,
          hatchSteps,
        });
      });

    const type = main_types.find((t) => typesList.indexOf(t) > -1);
    const color = colors[type];

    this.setState({
      imgUrl,
      index,
      name,
      types,
      stats: { hp, attack, defense, specialAttack, specialDefense, speed },
      height,
      weight,
      abilities,
      evs,
      color,
    });
  }

  render() {
    const {
      imgUrl,
      index,
      name,
      types,
      height,
      weight,
      abilities,
      evs,
      color,
      stats,
      description,
    } = this.state;

    return (
      <div className={styles.pokepage}>
        <div className="pokepage-btn-holder">
          <button
            className="pokepage-btn"
            onClick={() => this.props.history.goBack()}
            style={btnStyle}
          >
            Back
          </button>
        </div>

        <div>
          <header style={{ backgroundColor: `${color}` }}>
            <h2> {name} </h2>
            <span>#{index.toString().padStart(3, "0")}</span>
          </header>
          <div>
            <div className={styles.details}>
              <div className={styles["image-container"]}>
                <img src={imgUrl} alt={name} />
              </div>
              <div className={styles.info}>
                <p>Height: {height} ft.</p>
                <p>Weight: {weight} kg</p>
                <p>
                  Types: <span>{types}</span>
                </p>
                <p>
                  <span>Abilities</span>: {abilities}
                </p>
                <p>{description}</p>
                <p>{evs}</p>
              </div>
            </div>

            <div className="detail-stat">
              <div className="stat-row">
                <span>HP</span>
                <div className="meter">
                  <span
                    style={{
                      width: `${stats.hp > 100 ? stats.hp / 2 : stats.hp}%`,
                    }}
                  />
                </div>
              </div>
              <div className="stat-row">
                <span>Attack</span>
                <div className="meter">
                  <span
                    style={{
                      width: `${
                        stats.attack > 100 ? stats.attack / 2 : stats.attack
                      }%`,
                    }}
                  />
                </div>
              </div>
              <div className="stat-row">
                <span>Defense</span>
                <div className="meter">
                  <span
                    style={{
                      width: `${
                        stats.defense > 100 ? stats.defense / 2 : stats.defense
                      }%`,
                    }}
                  />
                </div>
              </div>
              <div className="stat-row">
                <span>Speed</span>
                <div className="meter">
                  <span
                    style={{
                      width: `${
                        stats.speed > 100 ? stats.speed / 2 : stats.speed
                      }%`,
                    }}
                  />
                </div>
              </div>
              <div className="stat-row">
                <span>Sp Attack</span>
                <div className="meter">
                  <span
                    style={{
                      width: `${
                        stats.specialAttack > 100
                          ? stats.specialAttack / 2
                          : stats.specialAttack
                      }%`,
                    }}
                  />
                </div>
              </div>
              <div className="stat-row">
                <span>Sp Defense</span>
                <div className="meter">
                  <span
                    style={{
                      width: `${
                        stats.specialDefense > 100
                          ? stats.specialDefense / 2
                          : stats.specialDefense
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const btnStyle = {
  width: "70px",
  height: "30px",
  margin: "10px",
  border: "none",
  borderRadius: "5px",
  transition: "transform 200ms ease-in-out",
  fontSize: "20px",
  letterSpacing: "1.2px",
};

export default PokePage;
