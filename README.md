# Hooks

**Nota:** No olvides añadir a tu archivo local App.css el contenido de App.css del repositorio.

Ahora vamos a crear un ***componente*** que nos permitirá buscar animales en adopción, de acuerdo a la ubicación, tipo de animal y su respectiva raza. Para ello, vamos a crear el componente **Busqueda.jsx**

```javascript
const Busqueda = () => {
  const ubicacion = "Seattle, WA";
  return (
    <div className="search-params">
      <form>
        <label htmlFor="ubicacion">
			Ubicación
          <input id="ubicacion" value={ubicacion} placeholder="Ubicación" />
        </label>
        <button>Enviar</button>
      </form>
    </div>
  );
};

export default Busqueda;
```

***¿Qué estamos haciendo aquí?***

 1. Creamos un ***componente de React*** llamado *Busqueda*, el cual inicialmente configura una **variable** llamada "**ubicacion**" (En el apartado lógico del componente -**Su cerebro**- ), y que después nos regresa un *form* en donde coloca un *label* y un *input* relacionados con el **valor** de la variable ubicación.
 2. Posteriormente lo exportamos para hacer uso de él. 
 3. Nótese que para las clases de estilo, usamos ***className*** ya que la palabra *class* es una palabra reservada de JS (Mismo caso para HTML)
 
Posteriormente vamos a importar *Busqueda* en *App* y vamos a **eliminar** todo su contenido para **colocar:** 


```javascript
import { render } from "react-dom";
import Busqueda from "./Busqueda"; //Esto cambió

const App = () => {
  return (
    <Busqueda/> <!--Esto cambió-->
  );
};

render(<App />, document.getElementById("root"));
```

Ahora bien, si nos dirigimos al navegador tras ejecutar el comando **npm start**, notaremos que al escribir en el *input* nuestro texto no se verá reflejado; al contrario, la ubicación por default (**"Seattle, WA"**) no se podrá *ni eliminar.* 

***¿Por qué sucede esto?*** 

 - Cada vez que React detecta un **evento** en el *DOM*, piensa que algún valor nuestro ha cambiado, y tras ello, decide **renderizar** nuevamente nuestro código para después comparar entre ambas versiones, y con ello **actualizar** unicamente lo que se ha modificado. 

Ante ello, vamos a **actualizar** nuestro variable de **ubicacion**, haciendo uso de nuestro primer hook: ***setState***

```javascript
// En Busqueda.js
import { useState } from "react";

// reemplazamos el valor original de ubicacion
const [ubicacion, setUbicacion] = useState("Seattle, WA");

// reemplazamos el input
<input
  id="ubicacion"
  value={ubicacion}
  placeholder="Ubicacion"
  onChange={(e) => setUbicacion(e.target.value)}
/>;
```

Este nos permite obtener una **variable** que apunta al valor del estado (**ubicacion**) y una **función** que le actualiza (**setUbicacion**) - Además, le asignamos un valor inicial dentro del paréntesis ("Seattle, WA"). 

Probablemente se preguntarán: ¿Por qué no asignamos el nuevo valor del target directamente a la variable de ubicación? o ¿por qué hacemos uso de setUbicacion para actualizarle? 

Pues bien, **he aquí las respuestas:** 

 - La función que nos brinda **setState** garantiza que al ejecutarla **SIEMPRE** se realice un **render** para poder **actualizar el contenido de la aplicación** (Aspecto que no se puede determinar cuando se asigna un nuevo valor a través del operador "=") 
 
 - El **modificar** el estado es un proceso ***asíncrono***, por lo que es posible que otras partes del código estén modificando el valor del estado y finalicen unos antes que otros, ocasionando que al final estos procesos tengan referencias a estados antiguos que no reflejan todos los procesamientos que se realizaron. 


Ante ello, el hacer uso de "setState" convierte una variable en un estado.

**¿Cuandó queremos hacer eso?**
Cuando una variable al ser modificada requiera un cambio en el DOM (Visual o estructural)

Pero...**¿Qué son los Hooks?** 
Los hooks son "ganchos" que se atrapan siempre que un "renderizado" se ejecuta; estos ocurren siempre en el mismo orden y por ende apuntan a una fase del estado diferente.
Nota: Nunca se colocan dentro de condicionales o ciclos. 

UFFF, eso fue bastante información; sigamos programando.

Ahora vamos a crear un "dropdown" de animales dentro del componente: 

```javascript
// debajo de imports
const ANIMALES = ["bird", "cat", "dog", "rabbit", "reptile"];

// debajo de ubicacion
const [animal, setAnimal] = useState("");

// debajo del label de ubicacion
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
</label>;
```


Ahora realizaremos un dropdown para la raza: 

```javascript
// debajo del último estado
const [raza, setRaza] = useState("");
const razas = [];

// debajo del label para animal
<label htmlFor="raza">
	Raza
  <select
    disabled={!razas.length}
    id="raza"
    value={raza}
    onChange={(e) => setRaza(e.target.value)}
    onBlur={(e) => setRaza(e.target.value)}
  >
    <option />
    {razas.map((raza) => (
      <option key={raza} value={raza}>
        {raza}
      </option>
    ))}
  </select>
</label>;
```

## Use Effect

Ahora queremos que nuestra aplicación **inice con información ya almacenada** y lista para ser presentada; para ello utilizaremos una **API** que nos brindará información acerca de animales en adopción dentro de Estados Unidos. Para ello, haremos uso del Hook ***UseEffect***. 

Este **hook** se ejecuta justo cuando nuestro componente es creado; es decir, casi al **inicio de nuestra aplicación** y antes de que el usuario pueda visualizar lo que se ha renderizado. En nuestro caso, vamos a realizar la llamada a nuestra API en este parte de la ejecución de nuestro programa. 

Añadimos las siguientes líneas a nuestro archivo de **Busqueda.jsx**

```javascript
// añadir nuevo import
import { useEffect, useState } from "react";
import Mascota from "./Mascota";

// Lo añadimos hasta arriba del componente
const [mascotas, setMascotas] = useState([]);

// Añadimos debajo de nuestra declaración de estados
useEffect(() => {
  obtenerMascotas();
}, []); 

async function obtenerMascotas() {
  const res = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${ubicacion}&breed=${raza}`
  );
  const json = await res.json();

  setMascotas(json.pets);
}

// Debajo del final del form
{
  mascotas.map((mascota) => (
    <Mascota nombre={mascota.name} animal={mascota.animal} raza={mascota.breed} key={mascota.id} />
  ));
}
```


***¿Qué estamos haciendo?***

 - Creamos una **función asíncrona** para llamar a la **API** con los filtros seleccionados por el usuario **(animal, ubicacion y raza)** y en ella ***actualizamos el estado*** de mascotas.

 - Llamamos a esa función en el hook ***UseEffect***, garantizando que este se ejecute **una sola vez al iniciar la aplicación** (Esto gracias a los **[]** que le añadimos como *segundo argumento*)
 
 - Finalmente, **renderizamos** a todas las mascotas a través de la función ***map***, en donde a cada una le **instanciamos** un *componente de *Mascota** con sus respectivas *props*. 

## Hooks personalizados

Es momento que ahora realicemos nuestro propio Hook, el cual se encargará de generar una lista de razas de acuerdo al animal que se haya seleccionado. 

Crearemos entonces un archivo llamado ***useListaRaza.js***

```javascript
import { useState, useEffect } from "react";

const localCache = {};

export default function useListaRaza(animal) {
  const [razas, setListaRaza] = useState([]);
  const [status, setStatus] = useState("sin cargar");

  useEffect(() => {
    if (!animal) {
      setListaRaza([]);
    } else if (localCache[animal]) {
      setListaRaza(localCache[animal]);
    } else {
      obtenerRazas()
    }

    async function obtenerRazas() {
      setListaRaza([]);
      setStatus("cargando");
      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = await res.json();
      localCache[animal] = json.breeds || [];
      setListaRaza(localCache[animal]);
