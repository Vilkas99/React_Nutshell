# Final

Para los últimos detalles de la aplicación, vamos a añadir **más estados** a nuestro *componente de búsqueda*, y agregaremos **eventos**  de nuestro form para que al enviarlo obtengamos las mascotas en cuestión:

```javascript
// Dentro de nuestro componente
const [mascotas, setMascotas] = useState([]);

// reemplazar form
<form
  onSubmit={e => {
    e.preventDefault();
	obtenerMascotas();
  }}
>
```

## Composición de componentes

Podemos notar que nuestro *componente de Busqueda* se está haciendo **excesivamente grande**; para ello, vamos a empezar a segmentarlo. 

Existen dos criterios para determinar cuando debemos separar un componente en pequeñas partes; **reusabilidad y organización.** 

Vamos a crear un nuevo componente llamado **Resultados.jsx**
```javascript
import Mascota from "./Mascota";

const Resultados = ({ mascotas }) => {
  return (
    <div className="search">
      {!mascotas.length ? (
        <h1>No se encontraron mascotas</h1>
      ) : (
        mascotas.map((mascota) => {
          return (
            <Mascota
              animal={mascota.animal}
              key={mascota.id}
              nombre={mascota.name}
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
```

Ahora regresaremos a **Busqueda.jsx** para importarlo y colocarlo: 

```javascript
// en la cima
import Resultados from "./Resultados";

// debajo del </form>
<Resultados mascotas={mascotas} />;
```


Por último, vamos a retocar el *componente de Mascota.jsx*

```javascript
const Mascota = (props) => {
  const { nombre, animal, raza, imagenes, ubicacion, id } = props;

  let imagen = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (imagenes.length) {
    imagen = imagenes[0];
  }

  return (
    <div className="pet">
      <div className="image-container">
        <img src={imagen} alt={nombre} />
      </div>
      <div className="info">
        <h1>{nombre}</h1>
        <h2>{`${animal} — ${raza} — ${ubicacion}`}</h2>
      </div>
    </div>
  );
};

export default Mascota;
```
# ¡Felicidades!
¡Ahora conocemos los fundamentos básicos de React para poder establecer aplicaciones web **dinámicas, reactivas y escalables**!

***¿Qué sigue después de aquí?***

 - [React Router](https://reactrouter.com/)
 - [Contexto](https://reactrouter.com/)
 - [Redux](https://react-redux.js.org/)

Espero que este tutorial te haya gustado; fue todo un placer volver a recordar los conceptos básicos de una herramienta tan poderosa como lo es **React**. 

No olvides darle una ***estrellita*** al repo para que más personas lo encuentren <3 

**Keep coding!**
