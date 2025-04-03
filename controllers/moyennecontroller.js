// const Moyenne = require("../models/moyenneModel");

// exports.getMoyenneById = async (req, res) => {
//   try {
//     const { id_et } = req.params;

//     if (!id_et) {
//       return res.status(400).json({
//         message: "L'ID de l'étudiant est requis",
//       });
//     }

//     const moyenne = await Moyenne.getMoyenneById(id_et);

//     // if (moyenne === null) {
//     //   return res.status(404).json({
//     //     message: "Aucune moyenne disponible pour cet étudiant",
//     //   });
//     // }
//     if (moyenne === null) {
//       return res.status(200).json({ moyenne: "Non disponible" });
//     }

//     res.status(200).json({
//       message: "Moyenne calculée avec succès",
//       moyenne: moyenne,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const Moyenne = require("../models/moyenneModel");

exports.getMoyenneById = async (req, res) => {
  try {
    const { id_et } = req.params;

    if (!id_et) {
      return res.status(400).json({
        message: "L'ID de l'étudiant est requis",
      });
    }

    const moyenne = await Moyenne.getMoyenneById(id_et);

    if (moyenne === null) {
      return res.status(200).json({ moyenne: "Non disponible" });
    }

    res.status(200).json({
      message: "Moyenne calculée avec succès",
      moyenne: moyenne,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStatistiquesClasse = async (req, res) => {
  try {
    const stats = await Moyenne.getStatistiquesClasse();

    res.status(200).json({
      message: "Statistiques de la classe récupérées avec succès",
      totalEtudiants: stats.totalEtudiants,
      moyenneClasse:
        stats.moyenneClasse !== null ? stats.moyenneClasse : "Non disponible",
      minMoyenne:
        stats.minMoyenne !== null ? stats.minMoyenne : "Non disponible",
      maxMoyenne:
        stats.maxMoyenne !== null ? stats.maxMoyenne : "Non disponible",
      nbAdmis: stats.nbAdmis,
      nbRedoublants: stats.nbRedoublants,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
