import "./App.css";
import PokeList from "./PokeList";
import PokeFloat from "./PokeFloat";

function App() {
  return (
    <div className="relative">
      <div className="flex justify-center py-3">
        <img className="h-[100px]" src="/logo.png" alt="로고" />
      </div>
      <PokeList></PokeList>
      <PokeFloat></PokeFloat>
    </div>
  );
}

export default App;
