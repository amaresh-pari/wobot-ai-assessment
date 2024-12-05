import redCircle from "../../assets/red-circle.png";
import greenCircle from "../../assets/green-circle.png";
import warningIcon from "../../assets/warning.png";

export const NameCheckBox = ({ item, data, checked, handleRowCheck }) => {
  const imageSource =
    data.current_status === "Offline" ? redCircle : greenCircle;
  return (
    <div className="name-title-wrap">
      <input
        className="checkbox"
        type="checkbox"
        onChange={handleRowCheck}
        value={data.id}
        checked={checked.includes(data.id)}
      />
      <img src={imageSource} className="activity-icon" />
      <p>{item}</p>
      {data.hasWarning && <img src={warningIcon} className="warning-icon" />}
    </div>
  );
};
