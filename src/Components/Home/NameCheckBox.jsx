export const NameCheckBox = ({ item, data, checked, handleRowCheck }) => {
  const imageSource =
    data.current_status === "Offline"
      ? "src/assets/red-circle.png"
      : "src/assets/green-circle.png";
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
      {data.hasWarning && (
        <img src="src/assets/warning.png" className="warning-icon" />
      )}
    </div>
  );
};
