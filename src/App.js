import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PokemonData from "./components/PokemonData";
import PokePage from "./components/PokePage";
import { Header } from "./components/Header";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={PokemonData} />
          <Route exact path="/pokemon/:index" component={PokePage} />
        </Switch>
      </div>
    </Router>
  );
}
