# Setup Inicial

Este curso funciona y ha sido probado tanto en **macOS** como en **Windows 10**. También funcionará muy bien en **Linux** (solo sigue las instrucciones de macOS). No debería necesitar una computadora particularmente poderosa para ninguna parte de este taller. **8 GB de RAM** te ayudarían a completarlo y definitivamente puedes realizarlo con menos.

 - [NodeJS](https://nodejs.org/es/download/)
 - [VS Code](https://code.visualstudio.com/download)
 

# ¿Quién soy?

¡Qué tal, viajerx del Internet! Soy **Víctor Mancera**, estudiante de Ingenieria en Tecnologías Computacionales y un apasionado por la filosofía, el arte, la tecnología y  **la combinación de estas**  para poder transformar al mundo. He trabajado con compañías de software como lo es **Intelimétrica** y **Analytics4Retail**, además de ser galardonado por la **Universidad de Stanford, Microsoft Student Amabassadors LATAM, Google Students Developers Club, entre otros,** por mi labor en el acto de crear software con causa social. 

![Victor Mancera](https://i.ibb.co/pzDVmGN/156608398-3719606524783457-4806181368299804823-n.jpg)

Puedes encontrarme en las siguientes redes: 

 - [Instagram](https://www.instagram.com/mancera.py/)
 - [LinkedIn](https://www.linkedin.com/in/victormancera/)
 - [Github](https://github.com/Vilkas99)

# React Puro

En esta sección analizaremos a React en su estado más básico con la finalidad de comprender como interactúa con el **DOM** y como se comporta con las funciones más básicas del desarrollo web. 

Iniciaremos creando una carpeta y en ella colocaremos un ***index.html*** en donde añadiremos la configuración inicial de nuestro html: 

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="./style.css">
  <title>Adopt Me</title>
</head>

<body>
  <div id="root">Sin renderizar...</div>
  <script src="https://unpkg.com/react@17.0.1/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@17.0.1/umd/react-dom.development.js"></script>
  <script>
    // Nuestro código estará aquí
  </script>
</body>

</html>
```


Puntos a considerar: 

 1. En el **body** añadimos un *div* con id de **root** ya que esta etiqueta le permitirá a **React** conectarse con el **DOM**. 
 2. Añadimos también dos *script* que nos conectan con la **API** de **React**; el **primero** nos permite obtener todos los métodos, opciones y configuraciones que nos provee la librería, mientras que el **segundo** se encarga específicamente de brindarnos los métodos para que React se conecte al DOM. 
 3. Añadimos otro *script* en donde colocaremos el código para esta primera parte. 
***Nota: Esta serie de pasos no se realizan cotidianamente;  sólo  se muestran por fines de aprendizaje ya que otras herramientas los realizan por nosotros.***

En el último *script* colocaremos el siguiente código: 

```javascript
const App = () => {
  return React.createElement(
    "div",
    {},
    React.createElement("h1", {}, "¡Adóptame!")
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
```
 
 
 ¿Qué estamos haciendo aquí? 
 

 1. Estamos creando un **componente de React** llamado *App*; estos componentes siempre regresarán un **html** (El esqueleto) y pueden también aplicar métodos de **JS** para el procesamiento de datos (El cerebro). 
 2. Se le dice **componente funcional** porque se le declara como una **arrow function** (Dentro de React también existen componentes escritos a través de  *clases*)
 3. El renderizado de estos componentes es **muy rápido** (Es decir; el acto de mostrar ese "h1" sucede en milisegundos)
 4. ***React.createElement*** nos permite crear una **instancia** (***Wink Wink POO Wink Wink***) de un componente (Tanto *web* - Como es el caso de este *h1*- como de *react)* 
 5. Su primer argumento es el **nombre** del *componente*, el segundo son las **configuraciones** del componente (Su *style*, *onChange*, etc...) y el último es su **contenido** (Incluso puede ser otro componente)
 6. ***ReactDOM.render*** es el método que se encarga de renderizar nuestro componente y colocarlo en el **HTML** (En nuestro caso lo colocamos en el ***div*** con **id** de *root)*. 
 7. **Nótese** que en el *render* estamos llamando **nuevamente** a **React.createElement** pero estableciéndole que su componente será el de **App**; hacemos esto porque sin este método, no podríamos crear una instancia de **App**, y por ende, no podríamos renderizarla (Piensa cuando aprendías sobre **POO**: estableces una clase, y después la instancias para poder usarla) por lo que al **render** le estamos brindando la *instancia* de nuestro componente.
 
## Componentes
Ahora que hemos aprendido la base de **React**. vamos a separar el código de nuestro **HTMl** para poder colocarlo en su propio archivo ***App.js***, y dentro de ahí también colocaremos el siguiente código: 

```javascript
const Mascota = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Luna"),
    React.createElement("h2", {}, "Dog"),
    React.createElement("h2", {}, "Havanese"),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "¡Adóptame!"),
    React.createElement(Mascota),
    React.createElement(Mascota),
    React.createElement(Mascota),
  ]);
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
```

 1. Creamos un ***componente de React*** llamado *Mascota* que regresará un *div* con tres "hijos" como su **contenido** (Los cuales también son ***componentes web***).
 2. En el ***componente de App*** podemos instanciar cuantas veces querramos el componente de *"Mascota"* (Nótese que los dos últimos parámetros - Configuración y contenido - pueden estar vacíos o ausentes al ser **opcionales**) 

Ahora bien, nuestro ***componente de Mascota*** no es dinámico a sabiendas de que siempre renderiza los **mismos datos** para sus componentes web: Un *doggo* llamado Luna que es de la raza Havanese. Esto no es bueno para la **reusabilidad** de nuestro código, por lo que ahora utilizaremos las famosas ***props*** (Propiedades o argumentos)

```javascript
const Mascota = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.nombre),
    React.createElement("h2", {}, props.animal),
    React.createElement("h2", {}, props.raza),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Adopt Me!"),
    React.createElement(Mascota, {
      nombre: "Luna",
      animal: "Dog",
      raza: "Havanese",
    }),
    React.createElement(Pet, {
      nombre: "Pepper",
      animal: "Bird",
      raza: "Cockatiel",
    }),
    React.createElement(Pet, { nombre: "Doink", animal: "Cat", raza: "Mix" }),
  ]);
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
```

¡Ahora nuestros componantes son **dinámicos y rehusables**! Las props son variables que se brindan desde el **parent hasta el child** y que permiten personalizar nuestros componentes de acuerdo a lo que se necesite. 

# React de la vida Real
## Setup

Utilizaremos el siguiente comando para poder **crear** nuestras aplicaciones de React con toda la configuración inicial para empezar a programar: 

    npx create-react-app <nombre>
    cd <nombre>

Para **ejecutar nuestro código**, colocaremos el siguiente comando en la terminal que se encuentra dentro de nuestro directorio: 

    npm start
  
  

Generaremos una serie de carpetas, de las cuales sólo nos concentraremos en ***src***, ahí dentro abriremos el archivo de ***App.js*** y **borraremos** todo el componente de ***App***  además de que modificaremos su extensión de "js" a "jsx"


## JSX

En la vida real, React se programa haciendo uso de la tecnología inmersa en JS de **JSX**, una versión de **JavaScript especializada en React** que se encarga de transformar esto: 

```javascript
      const Mascota = (props) => {
      return React.createElement("div", {}, [
        React.createElement("h1", {}, props.nombre),
        React.createElement("h2", {}, props.animal),
        React.createElement("h2", {}, props.raza),
      ]);
    };
```

En esto: 
```javascript
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
```

Podemos percatarnos entonces que JSX lo único que hace es ***traducir*** nuestro HTML directo al método de "React.CreateElement", eliminando con ello la necesidad de hacer uso de esta función en nuestro código. Tras ello, moveremos el código de mascota a su propio archivo llamado "Mascota.jsx" (Por convención, **todos** los archivos de código deben llamarse ***igual*** que su componente principal - **Con todo y mayúsculas** - ) 

Ahora modificaremos el componente de App con esta nueva metodología (Notemos también que hasta arriba tenemos que importar **"react-dom"** para poder hacer uso de su función **"render"** - También estamos importando al componente de Mascota de su propio archivo): 

```javascript
import { render } from "react-dom";
import Mascota from "./Mascota";

const App = () => {
  return (
    <div>
      <h1>¡Adóptame!</h1>
      <Mascota nombre="Luna" animal="dog" raza="Havanese" />
      <Mascota nombre="Estrella" animal="cat" raza="Abyssinian" />
      <Mascota nombre="Duquesa" animal="dog" raza="Jack Russell" />
    </div>
  );
};

render(<App />, document.getElementById("root"));
```
Podemos notar que también ya pasamos las **"props"** como etiqueta de ***HTML***.
