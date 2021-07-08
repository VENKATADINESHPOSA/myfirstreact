const FilterBar = ({ playersListFilter, filter }) => {
  const style = { paddingLeft: "5em", marginLeft: "5em" };
  const roleArray = ["All", "Batsman", "All-Rounder", "Bowler"];

  return roleArray.map((item) => (
    <>
      <input
        type="radio"
        name="playerslist"
        id={item}
        onChange={(e) => playersListFilter(e.target.value)}
        value={item}
        style={style}
        checked={filter === item}
      />
      <label htmlFor={item}>{item}</label>
    </>
  ));
};

export default FilterBar;
