// ValeurStat.jsx
import "../css/statistique.css";

function ValeurStat({ titre, valeur }) {
  return (
    <div className="val">
      <h2 className="descri">{titre}</h2>
      <p className="valeur">{valeur}</p>
    </div>
  );
}

export default ValeurStat;
