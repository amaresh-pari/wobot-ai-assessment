export const StatusTag = ({ status, data, onClick }) => {
  const handleClick = () => {
    onClick({
      id: data.id,
      status: status === "Active" ? "Inactive" : "Active",
    });
  };
  const className = "status " + (status === "Active" ? "active" : "inactive");
  return (
    <div className={className} onClick={handleClick}>
      {status}
    </div>
  );
};
