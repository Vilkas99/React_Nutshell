import { useState, useEffect } from "react";

const localCache = {};

export default function useRazaLista(animal) {
  const [razaLista, setRaza] = useState([]);
  const [status, setStatus] = useState("sin cargar");

  useEffect(() => {
    if (!animal) {
      setRaza([]);
    } else if (localCache[animal]) {
      setRaza(localCache[animal]);
    } else {
      pedirRazas();
    }

    async function pedirRazas() {
      setRaza([]);
      setStatus("cargando");
      const respuesta = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );

      const json = await respuesta.json();
      localCache[animal] = json.breeds || [];
      setRaza(localCache[animal]);
      setStatus("finalizado");
    }
  }, [animal]);

  return [razaLista, status];
}
