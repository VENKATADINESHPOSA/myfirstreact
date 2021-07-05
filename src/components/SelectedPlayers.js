import SelectedPlayer from "./SelectedPlayer";

const SelectedPlayers = ({ counter, selectedPlayers }) => {
  return (
    <section className="section2">
      <h1>
        Selected Players ({selectedPlayers.length}) - ({counter})
      </h1>
      {selectedPlayers.map((item) => (
        <SelectedPlayer key={item} item={item} />
      ))}
    </section>
  );
};

export default SelectedPlayers;
