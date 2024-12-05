import cloudImg from "../../assets/cloud.png";
import hostingImg from "../../assets/hosting.png";

export const Health = ({ cloud, device }) => {
  const cloudClassName = `circle ${
    cloud === "A" ? "green-outline" : "yellow-outline"
  }`;
  const deviceClassName = `circle ${
    device === "A" ? "green-outline" : "yellow-outline"
  }`;
  return (
    <div className="health-wrap">
      <img src={cloudImg} className="health-icon" />
      <div className={cloudClassName}>
        <p>{cloud}</p>
      </div>

      <img src={hostingImg} className="health-icon" />
      <div className={deviceClassName}>
        <p>{device}</p>
      </div>
    </div>
  );
};
