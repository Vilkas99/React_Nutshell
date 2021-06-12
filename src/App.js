import "./App.css";
import Mascota from "./components/Mascota";

function App() {
  return (
    <div>
      <h1>Adoptame</h1>
      <Mascota nombre="Duquesa" animal="Perro" raza="Jack Rusell" />
      <Mascota nombre="Tortuga" animal="Tortuga" raza="Orejas Rojas" />
    </div>
  );
}

export default App;
