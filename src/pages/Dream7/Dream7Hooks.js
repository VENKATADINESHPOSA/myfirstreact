import React, { useEffect, useState } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import validateInput from "../../utils/validations";
import PlayersList from "../../components/PlayersList";
import SelectedPlayers from "../../components/SelectedPlayers";
import players from "../../mock/players.json";
import FilterBar from "../../components/FilterBar";
import { BAT_LIMIT, BALL_LIMIT, ALL_LIMIT } from "../../constants";

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
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    setPlayersList(players);
  }, []);

  const getFilteredPlayers = (value) =>
    players.filter((player) => player.role === value);

  const playersListFilter = (i) => {
    setFilter(i);
    if (i === "All") {
      setPlayersList(players);
      return;
    }

    setPlayersList(getFilteredPlayers(i));
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
      <FilterBar playersListFilter={playersListFilter} filter={filter} />
      <PlayersList {...playerProps} />
      <SelectedPlayers {...selectedPlayerprops} />
    </>
  );
};

export default PlayersSelection;
