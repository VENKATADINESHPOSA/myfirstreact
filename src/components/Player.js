import { Link } from "react-router-dom";

const Player = ({
  player,
  isButtonDisabled,
  addHandler,
  selectedPlayers,
  removeHandler,
}) => {
  return (
    <div>
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
  );
};

export default Player;
