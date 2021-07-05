import Player from "./Player";

const PlayersList = ({
  isButtonDisabled,
  addHandler,
  selectedPlayers,
  removeHandler,
  playersList,
}) => {
  return (
    <section className="section1">
      <h1>Players Selection</h1>
      {playersList.map((player) => (
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
