import React, { useState } from "react";
import players from "./players.json";
import "./App.css";
import { Link } from "react-router-dom";

const MAX_COUNT = 75;
const BAT_LIMIT = 3;
const BALL_LIMIT = 2;
const ALL_LIMIT = 2;

function PlayersSelection() {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [counter, setCounter] = useState(0);
  const [selectedObject, setSelectedObject] = useState({
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
  });

  const validateInput = (name, role, points) => {
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
  const addHandler = ({ name, role, points }) => {
    const selectedObjectCopy = { ...selectedObject };
    const { sel } = selectedObjectCopy[role];
    const val = validateInput(name, role, points);

    if (val) return;
    // Updating the state with added players
    selectedPlayers.push(name);
    selectedObjectCopy[role].sel = sel + 1;
    //
    setSelectedPlayers(selectedPlayers);
    setSelectedObject(selectedObjectCopy);
    setCounter((prevcounter) => prevcounter + Number(points));
  };

  const removeHandler = ({ name, role, points }) => {
    const selectedObjectCopy = { ...selectedObject };
    const { sel } = selectedObjectCopy[role];

    if (!selectedPlayers.includes(name)) {
      alert("Player not added");
      return;
    }
    const updatedArr = selectedPlayers.filter(
      (playerName) => playerName !== name
    );
    selectedObjectCopy[role].sel = sel - 1;
    setSelectedPlayers(updatedArr);
    setSelectedObject(selectedObjectCopy);
    setCounter((prevcounter) => prevcounter - Number(points));
  };

  const isButtonDisabled = (player) => {
    return (
      selectedPlayers.includes(player.name) ||
      Number(player.points) + counter > 75
    );
  };

  return (
    <>
      <Link exact to="/">
        Home
      </Link>
      <section className="section1">
        <h1>Players Selection</h1>
        {players.map((player) => (
          <div key={player.id}>
            <Link to={`/player/${player.id}`}>{player.name}</Link>
            <span> {player.role} </span>
            <span> {player.points} </span>
            <button
              disabled={isButtonDisabled(player)}
              style={{ margin: "10px" }}
              onClick={() => addHandler(player)}
            >
              Add Player
            </button>
            <button
              disabled={!selectedPlayers.includes(player.name)}
              onClick={() => removeHandler(player)}
            >
              Remove Player
            </button>
          </div>
        ))}
      </section>
      <section className="section2">
        <h1>
          Selected Players ({selectedPlayers.length}) - (
          {counter})
        </h1>
        {selectedPlayers.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </section>
    </>
  );
}

export default PlayersSelection;
