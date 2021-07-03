import React, { Component } from "react";
import Players from "./players.json";
import "./App.css";

const MAX_COUNT = 75;
const BAT_LIMIT = 3;
const BALL_LIMIT = 2;
const ALL_LIMIT = 2;

class PlayersSelection extends Component {
  state = {
    selectedPlayers: [],
    counter: 0,
    selectedObject: {
      Batsman: {
        sel: 0,
        limit: BAT_LIMIT,
      },
      Bowler: {
        sel: 0,
        limit: BALL_LIMIT,
      },
      AllRounder: {
        sel: 0,
        limit: ALL_LIMIT,
      },
    },
  };

  validateInput = (name, role, points) => {
    const { selectedPlayers, selectedObject, counter } = this.state;
    const s = selectedObject[role];

    if (counter + Number(points) > MAX_COUNT) {
      alert("Can't select more than " + MAX_COUNT + " points");
      return true;
    }

    if (selectedPlayers.includes(name)) {
      alert("Player already added");
      return true;
    }

    if (selectedPlayers.length === 7) {
      alert("Can't select more than 7");
      return true;
    }

    if (s.sel === s.limit) {
      alert(`Can't select more than ${s.limit} ${role}`);
      return true;
    }
     return false;
  };

  addHandler = ({ name, role, points }) => {
    const { selectedPlayers, selectedObject, counter } = this.state;
    const selectedObjectCopy = { ...selectedObject };
    const { sel } = selectedObjectCopy[role];

    const val = this.validateInput(name, role, points);

    if (val)
      return;
    
// Updating the state with added players
    selectedPlayers.push(name);
    selectedObjectCopy[role].sel = sel + 1;
// 
    this.setState({
      ...this.state,
      selectedPlayers,
      selectedObject: selectedObjectCopy,
      counter: counter + Number(points),
    });
  };

  removeHandler = ({ name, role, points }) => {
    const { selectedPlayers, selectedObject, counter } = this.state;
    const selectedObjectCopy = { ...selectedObject };
    const { sel } = selectedObjectCopy[role];

    if (!selectedPlayers.includes(name)) {
      alert("Player not added");
      return;
    }
    const updatedArr = this.state.selectedPlayers.filter(
      (playerName) => playerName !== name
    );
    selectedObjectCopy[role].sel = sel - 1;

    this.setState({
      selectedPlayers: updatedArr,
      selectedObject: selectedObjectCopy,
      counter: counter - Number(points),
    });
  };

  isButtonDisabled = (player) => {
    return (this.state.selectedPlayers.includes(player.name) || Number(player.points) + this.state.counter > 75)
  }

  render() {
    
    return (
      <>
        <section className="section1">
          <h1>Players Selection</h1>
          {Players.map((player) => (
            <p key={player.id}>
              <strong>{player.name}</strong>
              <span> {player.role} </span> 
              <span> {player.points} </span>
              <button
                disabled={this.isButtonDisabled(player)}
                style={{ margin: "10px" }}
                onClick={() => this.addHandler(player)}
              >
                Add Player
              </button>
              <button disabled={!this.state.selectedPlayers.includes(player.name)} onClick={() => this.removeHandler(player)}>
                Remove Player
              </button>
            </p>
          ))}
        </section>
        <section className="section2">
          <h1>Selected Players ({this.state.selectedPlayers.length}) - ({this.state.counter})</h1>
          {this.state.selectedPlayers.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </section>
      </>
    );
  }
}

export default PlayersSelection;
