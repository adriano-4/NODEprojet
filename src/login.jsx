import { useState } from "react";
import logo1 from "./assets/logo1.png";
import "./App.css";
import "./login.css";

function Login() {
  return (
    <>
  <Fond/>
      <div id="container">
        <h2 class="bienvenue" >Bienvenue</h2>
        <img src={logo1} class="logo1" alt="logo1" />
        <div className="formulaire">
          <form action="">
            <input class="loginp" type="text" placeholder="Nom d'utilisateur" />
            <br />
            <input class="loginp" type="text" placeholder="Mot de passe" />
            <br />
            <input class="btnco" type="submit" value="Se connecter" />
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
