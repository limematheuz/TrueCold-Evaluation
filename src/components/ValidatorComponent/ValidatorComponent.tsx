import React, { useState } from "react";
import { Link, LoaderFunction } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import "./ValidatorComponent.css";

interface ApiResponse {
  valid: boolean;
}

const ValidatorComponent: React.FC = () => {
  const [temperature, setTemperature] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTemperature(event.target.value);
    setErrorMessage("");
  };

  const validateTemperature = async () => {
    setLoading(true);
    const regex = /^[0-9.,]*$/;
    if (temperature === "" || !regex.test(temperature)) {
      setErrorMessage(
        "Por favor, ingresa una temperatura dentro del rango de 2C y 8C. El campo de entrada de numero no puede estar vacio!"
      );
      setIsValid(null);
      setLoading(false);
      return;
    }

    let inputNormalizedTemperature = temperature;

    if (temperature.includes(",")) {
      inputNormalizedTemperature = temperature.replace(",", ".");
    }

    const parsedTemperature = parseFloat(inputNormalizedTemperature);

    if (isNaN(parsedTemperature)) {
      setErrorMessage("debes ingresar un número válido!");
      setIsValid(null);
      return;
    }

    try {
      const response = await fetch(
        "https://mpdmwg-3000.csb.app/validate-temperature",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ temperature: parsedTemperature }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status || response.statusText}`);
      }

      const data: ApiResponse = await response.json();

      setIsValid(data.valid);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Error validando la temperatura:");
      setIsValid(null);
      setErrorMessage("Error al validar la temperatura. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="validator-container">
      <h2> Validador de temperatura </h2>
      <input
        type="text"
        value={temperature}
        onChange={handleInputChange}
        placeholder="ingresar temperatura"
      />
      <button onClick={validateTemperature} disabled={loading}>
        {loading ? <Spinner /> : "Validar temperatura"}
      </button>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {isValid !== null && (
        <p className={`${isValid ? "valid-message" : "invalid-message"}`}>
          La Temperatura es{" "}
          {isValid
            ? "válida y está dentro del rango de ( 2C - 8C )"
            : "no es válida porque no está dentro del rango de ( 2C - 8C )"}
        </p>
      )}
      <Link className="home-link" to="/">
        ⬅️ Home
      </Link>
    </div>
  );
};

export default ValidatorComponent;
