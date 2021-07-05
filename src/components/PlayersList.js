import players from "../mock/players.json";
import Player from "./Player";

const PlayersList = ({
  isButtonDisabled,
  addHandler,
  selectedPlayers,
  removeHandler,
}) => {
  return (
    <section className="section1">
      <h1>Players Selection</h1>
      {players.map((player) => (
        <Player
          key={player.id}
          player={player}
          isButtonDisabled={isButtonDisabled}
          addHandler={addHandler}
          selectedPlayers={selectedPlayers}
          removeHandler={removeHandler}
        />
      ))}
    </section>
  );
};

export default PlayersList;
