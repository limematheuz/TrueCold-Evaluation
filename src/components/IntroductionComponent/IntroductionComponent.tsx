import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

const IntroductionComponent: React.FC = () => {
  const [start, setStart] = useState(false);

  const handleStart = () => {
    setStart(true);
  };

  return (
    <div className="App">
      <div className="content">
        {!start ? (
          <>
            <h1>¡Hola!</h1>
            <h2>Estamos emocionados de tenerte aquí</h2>
            <p>Te presentamos una pequeño reto para desarrollar:</p>
            <p>
              <strong>
                Implementa un componente en React que permita al usuario
                ingresar una temperatura y muestre si está dentro del rango
                permitido (2°C - 8°C).
              </strong>
            </p>
            <Link to="/validate">
              <button className="start-button" onClick={handleStart}>
                ¡Comenzar!
              </button>
            </Link>
          </>
        ) : (
          <div className="questions">
            <h2>¡Buena suerte!</h2>
            <p>
              Código simple, con validaciones básicas usando hooks (useState).
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroductionComponent;
