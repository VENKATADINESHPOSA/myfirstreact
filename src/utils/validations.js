import { MAX_COUNT } from "../constants";

const validateInput = (
  name,
  role,
  points,
  selectedObject,
  counter,
  selectedPlayers
) => {
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

export default validateInput;
