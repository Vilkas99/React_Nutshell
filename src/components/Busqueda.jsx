import React, { useState, useEffect } from "react";
import Mascota from "./Mascota";
import useRazaLista from "../hooks/useRazaLista";

const ANIMALES = ["bird", "cat", "dog", "rabbit", "reptile"];

const Busqueda = () => {
  useEffect(() => {
    obtenerMascotas();
  }, []);

  async function obtenerMascotas() {
    const respuesta = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${ubicacion}&breed=${raza}`
    );

    const json = await respuesta.json();

    setMascotas(json.pets);
  }

  const [mascotas, setMascotas] = useState([]);
  const [ubicacion, setUbicacion] = useState("Seattle, WA");
  const [animal, setAnimal] = useState("");
  const [raza, setRaza] = useState("");

  const [razaLista] = useRazaLista(animal);

  return (
    <div>
      <div className="search-params">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            obtenerMascotas();
          }}
        >
          <label htmlFor="ubicacion">
            Ubicacion
            <input
              id="ubicacion"
              value={ubicacion}
              placeholder="Coloca la ubicación deseada"
              onChange={(e) => setUbicacion(e.target.value)}
            ></input>
            <button>Enviar</button>
          </label>

          <label htmlFor="animal">
            Animal
            <select
              id="animal"
              value={animal}
              onChange={(e) => setAnimal(e.target.value)}
              onBlur={(e) => setAnimal(e.target.value)}
            >
              <option />
              {ANIMALES.map((animal) => (
                <option key={animal} value={animal}>
                  {animal}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="raza">
            Raza
            <select
              id="raza"
              value={raza}
              onChange={(e) => setRaza(e.target.value)}
              onBlur={(e) => setRaza(e.target.value)}
            >
              <option />
              {razaLista.map((raza) => (
                <option key={raza} value={raza}>
                  {raza}
                </option>
              ))}
            </select>
          </label>
        </form>

        {mascotas.map((mascota) => (
          <Mascota
            nombre={mascota.name}
            animal={mascota.animal}
            raza={mascota.breed}
            key={mascota.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Busqueda;
