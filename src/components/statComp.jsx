import "../css/statistique.css";
import ValeurStat from "../components/valeurStat";

function StatComp() {
  return (
    <div className="contstat">
      <div className="contstat1">
        <div className="contstat11">
          <h2>Valeur statistiques :</h2>
          <div className="diag" id="diag1">
            <ValeurStat />
            <ValeurStat />
            <ValeurStat />
            <ValeurStat />
            <ValeurStat />
            <ValeurStat />
          </div>
        </div>
        <div className="contstat11">
          <h2>Diagramme :</h2>
          <div className="diag"></div>
        </div>
      </div>
    </div>
  );
}

export default StatComp;
