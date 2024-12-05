export const NameTitleCheckBox = ({ checked, cameraList, toggleCheckAll }) => {
  const isChecked = checked.length === cameraList.length;

  return (
    <div className="name-title-wrap">
      <input
        className="checkbox"
        type="checkbox"
        onChange={toggleCheckAll}
        checked={isChecked}
      />
      <p>Name</p>
    </div>
  );
};
