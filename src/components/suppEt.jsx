import "../css/suppEt.css";
import "../css/ajoutEt.css";

function SuppEt({ confirmerSuppression, annulerSuppression }) {
  return (
    <div className="flou">
      <div className="centre" id="centre">
        <h2>Voulez-vous vraiment supprimer cet étudiant ?</h2>
        <div className="button">
          <button className="oui" onClick={confirmerSuppression}>
            OUI
          </button>
          <button className="non" onClick={annulerSuppression}>
            NON
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuppEt;
