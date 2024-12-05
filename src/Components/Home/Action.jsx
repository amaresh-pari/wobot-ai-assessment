import notAllowed from "../../assets/not-allowed.png";

export const Action = ({ checked, data, handleDelete }) => {
  const handleClick = () => {
    handleDelete(data.id);
  };
  if (checked) {
    return (
      <p onClick={handleClick} className="delete">
        Delete
      </p>
    );
  }
  return <img src={notAllowed} className="action-icon" />;
};
