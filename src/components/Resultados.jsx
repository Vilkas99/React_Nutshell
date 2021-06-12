import Mascota from "./Mascota";

const Resultados = ({ mascotas }) => {
  return (
    <div className="search">
      {!mascotas.length ? (
        <h1>Ningún animalito encontrado</h1>
      ) : (
        mascotas.map((mascota) => {
          return (
            <Mascota
              animal={mascota.animal}
              key={mascota.id}
              raza={mascota.breed}
              imagenes={mascota.images}
              ubicacion={`${mascota.city}, ${mascota.state}`}
              id={mascota.id}
            />
          );
        })
      )}
    </div>
  );
};

export default Resultados;
