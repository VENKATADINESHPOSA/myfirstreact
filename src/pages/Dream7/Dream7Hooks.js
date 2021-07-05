import React, { useState } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import validateInput from "../../utils/validations";
import PlayersList from "../../components/PlayersList";
import SelectedPlayers from "../../components/SelectedPlayers";
import players from "../../mock/players.json";

const BAT_LIMIT = 3;
const BALL_LIMIT = 2;
const ALL_LIMIT = 2;
const style = { paddingLeft: "5em", marginLeft: "5em" };
const batsManPlayers = players.filter((player) => player.role === "Batsman");
const bowlerPlayers = players.filter((player) => player.role === "Bowler");
const allRounderPlayers = players.filter(
  (player) => player.role === "All-Rounder"
);

const PlayersSelection = () => {
  const [playersList, setPlayersList] = useState([]);
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
    "All-Rounder": {
      sel: 0,
      limit: ALL_LIMIT,
    },
  });

  const playersListFilter = (e) => {
    if (e.target.value === "All") {
      setPlayersList(players);
    }
    if (e.target.value === "Bowler") {
      setPlayersList(bowlerPlayers);
    }
    if (e.target.value === "All-Rounder") {
      setPlayersList(allRounderPlayers);
    }
    if (e.target.value === "Batsman") {
      setPlayersList(batsManPlayers);
    }
  };

  const addHandler = ({ name, role, points }) => {
    const selectedObjectCopy = { ...selectedObject };
    const { sel } = selectedObjectCopy[role];
    const val = validateInput(
      name,
      role,
      points,
      selectedObject,
      counter,
      selectedPlayers
    );

    if (val) return;
    // Updating the state with added players
    // selectedPlayers.push(name);
    selectedObjectCopy[role].sel = sel + 1;
    //
    setSelectedPlayers([...selectedPlayers, name]);
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

  const isButtonDisabled = (player) =>
    selectedPlayers.includes(player.name) ||
    Number(player.points) + counter > 75;

  const playerProps = {
    isButtonDisabled,
    removeHandler,
    addHandler,
    selectedPlayers,
    playersList,
  };

  const selectedPlayerprops = {
    counter,
    selectedPlayers,
  };

  return (
    <>
      <Link exact to="/">
        Home
      </Link>
      <br />
      <br />
      <input
        type="radio"
        name="playerslist"
        id="All"
        onClick={playersListFilter}
        value="All"
      />
      <label htmlFor="All">All Players</label>
      <input
        type="radio"
        name="playerslist"
        id="Batsman"
        onClick={playersListFilter}
        value="Batsman"
        style={style}
      />
      <label htmlFor="Batsman">Batsman Players</label>
      <input
        type="radio"
        name="playerslist"
        id="All-Rounder"
        onClick={playersListFilter}
        value="All-Rounder"
        style={style}
      />
      <label htmlFor="All-Rounder">All-Rounder Players</label>
      <input
        type="radio"
        name="playerslist"
        id="Bowler"
        onClick={playersListFilter}
        value="Bowler"
        style={style}
      />
      <label htmlFor="Bowler">Bowler Players</label>
      <PlayersList {...playerProps} />
      <SelectedPlayers {...selectedPlayerprops} />
    </>
  );
};

export default PlayersSelection;
