import "./App.css";
import PokeList from "./PokeList";
import PokeFloat from "./PokeFloat";

import { DndProvider } from "react-dnd";
import { MultiBackend } from "react-dnd-multi-backend";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useState } from "react";
import { TouchTransition, MouseTransition } from "react-dnd-multi-backend";

import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";

const customBackend = {
  backends: [
    {
      backend: HTML5Backend,
      transition: MouseTransition,
    },
    {
      backend: TouchBackend,
      options: {
        enableMouseEvents: false,
        enableTouchEvents: true,
        delayTouchStart: 100,
      },
      transition: TouchTransition,
      preview: true,
    },
  ],
};

function App() {
  const [filterName, setFilterName] = useState("");
  const [filterTypes, setFilterTypes] = useState<string[]>([]);

  return (
    <DndProvider backend={MultiBackend} options={customBackend}>
      <div className="relative pb-[300px] lg:pb-[0px]">
        <div className="flex justify-center py-3 relative">
          <img className="h-[100px]" src="/logo.png" alt="로고" />
          <ul className="absolute top-[10px] right-[10px]">
            <li>
              <a
                className="underline text-[13px] font-semibold"
                href="https://github.com/kss761036/pokevs"
                rel="noopener noreferrer"
                target="_blank">
                깃허브
              </a>
            </li>
          </ul>
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
