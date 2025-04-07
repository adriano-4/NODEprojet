import "../css/resultat.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Info_note() {
  return (
    <div className="container3">
      <div className="cont">
        <div className="cont_1">
          <p>Numero étudiant : </p>
          <span></span>
        </div>
        <div className="cont_1">
          <p>nom étudiant : </p>
          <span>zeefazf</span>
        </div>

        <div className="tableau2">
          <table>
            <thead>
              <tr>
                <th>Matière</th>
                <th>Note</th>
                <th>Modifier</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <button>
                    <i className="fa fa-edit"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Info_note;
