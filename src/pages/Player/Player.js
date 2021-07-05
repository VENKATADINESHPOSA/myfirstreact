import React from "react";
import players from "../../mock/players.json";
import { Link } from "react-router-dom";

const style = {
  textAlign: "center",
};

const Player = (props) => {
  const playerId = props.match.params.id;
  const playerdet = players.filter((item) => item.id === playerId);
  return (
    <>
      <Link to="/dream7">Players List</Link>
      <h1 style={style}>Player Details</h1>
      {playerdet.map((player) => (
        <div key={player.id}>
          <p>
            Name : <strong>{player.name}</strong>
          </p>
          <p>Role : {player.role}</p>
          <p>Points : {player.points}</p>
        </div>
      ))}
    </>
  );
};

export default Player;
