export const Health = ({ cloud, device }) => {
  const cloudClassName = `circle ${
    cloud === "A" ? "green-outline" : "yellow-outline"
  }`;
  const deviceClassName = `circle ${
    device === "A" ? "green-outline" : "yellow-outline"
  }`;
  return (
    <div className="health-wrap">
      <img src="src/assets/cloud.png" className="health-icon" />
      <div className={cloudClassName}>
        <p>{cloud}</p>
      </div>

      <img src="src/assets/hosting.png" className="health-icon" />
      <div className={deviceClassName}>
        <p>{device}</p>
      </div>
    </div>
  );
};
