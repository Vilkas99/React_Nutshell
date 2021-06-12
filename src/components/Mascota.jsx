import React from "react";

const Mascota = ({ nombre, animal, raza, imagenes, ubicacion, id }) => {
  let imagen = "http://pets-images.dev-apis.com/pets/none.jpg";

  if (imagenes.length) {
    imagen = imagenes[0];
  }


  return (
    <div>
        <div className = "image-container">
            <img className = "pet" src = {imagen} alt ={nombre}/>
        </div>    
        
        <div className = "info">
            <h1>{nombre}</h1>
            <h2>{`${animal} - ${raza} - ${ubicacion}`}</h2>
        </div>

    </div>
  );
};

export default Mascota;
