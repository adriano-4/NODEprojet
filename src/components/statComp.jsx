import "../css/statistique.css";
import ValeurStat from "../components/valeurStat";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function StatComp() {
  const [moyennes, setMoyennes] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/moyennes")
      .then((response) => {
        console.log(response.data);
        setMoyennes(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des moyennes !", error);
      });
  }, [moyennes]);

  const data = {
    labels: ["Moyenne de la classe", "Moyenne minimale", "Moyenne maximale"],
    datasets: [
      {
        label: "Moyennes",
        data: [
          moyennes.moyenneClasse || 0,
          moyennes.minMoyenne || 0,
          moyennes.maxMoyenne || 0,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        barThickness: 55,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw} ventes`,
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 20,
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: false,
        },
      },
    },
    elements: {
      bar: {
        categoryPercentage: 0.5,
        barPercentage: 0.7,
      },
    },
  };

  return (
    <div className="contstat">
      <div className="contstat1">
        <div className="contstat11">
          <h2>Valeur statistiques :</h2>
          {/* Vérifie si l'objet moyennes est bien chargé avant de l'afficher */}
          {moyennes.moyenneClasse ? (
            <div className="diag" id="diag1">
              <ValeurStat
                titre="Moyenne de la classe"
                valeur={moyennes.moyenneClasse}
              />
              <ValeurStat titre="Moyenne min" valeur={moyennes.minMoyenne} />
              <ValeurStat titre="Moyenne max" valeur={moyennes.maxMoyenne} />
              <ValeurStat titre="Total admis" valeur={moyennes.nbAdmis} />
              <ValeurStat
                titre="Total redoublant"
                valeur={moyennes.nbRedoublants}
              />
              <ValeurStat
                titre="Nombre d'élèves"
                valeur={moyennes.totalEtudiants}
              />
            </div>
          ) : (
            <p>Chargement des statistiques...</p>
          )}
        </div>
        <div className="contstat11">
          <h2>Diagramme :</h2>
          <div className="diag" id="diag">
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatComp;
