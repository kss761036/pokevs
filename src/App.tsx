import "./App.css";
import PokeList from "./PokeList";
import PokeFloat from "./PokeFloat";

import { DndProvider } from "react-dnd";
import { MultiBackend } from "react-dnd-multi-backend";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { useState } from "react";

function App() {
  const [filterName, setFilterName] = useState("");
  const [filterTypes, setFilterTypes] = useState<string[]>([]);

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <div className="relative pb-[300px] lg:pb-[0px]">
        <div className="flex justify-center py-3">
          <img className="h-[100px]" src="/logo.png" alt="로고" />
        </div>
        <PokeList filterName={filterName} filterTypes={filterTypes} />
        <PokeFloat
          filterName={filterName}
          setFilterName={setFilterName}
          filterTypes={filterTypes}
          setFilterTypes={setFilterTypes}
        />
      </div>
    </DndProvider>
  );
}

export default App;
