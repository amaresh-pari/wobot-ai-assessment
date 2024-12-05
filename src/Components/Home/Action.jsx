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
  return <img src="src/assets/not-allowed.png" className="action-icon" />;
};
