import "./App.css";
import PokeList from "./PokeList";
import PokeFloat from "./PokeFloat";

import { DndProvider } from "react-dnd";
import { MultiBackend } from "react-dnd-multi-backend";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { HTML5toTouch } from "rdndmb-html5-to-touch";

function App() {
  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <div className="relative">
        <div className="flex justify-center py-3">
          <img className="h-[100px]" src="/logo.png" alt="로고" />
        </div>
        <PokeList></PokeList>
        <PokeFloat></PokeFloat>
      </div>
    </DndProvider>
  );
}

export default App;
