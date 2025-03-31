import "../css/ajoutEt.css";

function AjoutEt() {
  return (
    <div className="flou">
      <div className="centre">
        <h2>Ajout etudiant</h2>
        <form action="">
          <input type="text" placeholder="Matricule" />
          <br />
          <input type="text" placeholder="Nom" />
          <br />
          <input type="text" placeholder="Prenom" />
          <br />
          <input type="text" placeholder="adresse email" />
          <br />
          <input type="button" value="Ajouter"/>
        </form>
      </div>
    </div>
  );
}

export default AjoutEt;
