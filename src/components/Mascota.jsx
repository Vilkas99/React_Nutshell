import React from "react";

const Mascota = (props) => {
  return (
    <div>
      <h1>{props.nombre}</h1>
      <h2>{props.animal}</h2>
      <h2>{props.raza}</h2>
    </div>
  );
};

export default Mascota;
