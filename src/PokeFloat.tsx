import Card from "@mui/material/Card";
import Input from "@mui/material/Input";
import { useDrop } from "react-dnd";
import { useRef, useEffect, useState } from "react";
import { Pokemon } from "./type";

const PokeFloat = () => {
  const ref1 = useRef<HTMLLIElement>(null);
  const ref2 = useRef<HTMLLIElement>(null);

  const [poke1, setPoke1] = useState<Pokemon | null>(null);
  const [poke2, setPoke2] = useState<Pokemon | null>(null);

  const [{ isOver: isOver1 }, drop1] = useDrop(() => ({
    accept: "POKEMON_CARD",
    drop: (item: Pokemon) => {
      setPoke1(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const [{ isOver: isOver2 }, drop2] = useDrop(() => ({
    accept: "POKEMON_CARD",
    drop: (item: Pokemon) => {
      setPoke2(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  useEffect(() => {
    if (ref1.current) drop1(ref1.current);
    if (ref2.current) drop2(ref2.current);
  }, [drop1, drop2]);

  return (
    <div className="fixed top-[100px] left-1/2 translate-x-[calc(-100%_-_250px)] w-[300px]">
      <form action="">
        <fieldset>검색</fieldset>
        <Input></Input>
        <ul>
          <li>
            <h4>타입</h4>
          </li>
        </ul>
      </form>
      <ul className="flex">
        <li ref={ref1} className="flex-1 p-1">
          <Card variant="outlined">
            <div className="aspect-1/1 flex items-center justify-center">
              {poke1 ? (
                <img
                  src={`https://projectpokemon.org/images/normal-sprite/${poke1.engName}.gif`}
                  alt={poke1.name}
                  className="max-w-[80px]"
                />
              ) : (
                <span className="text-gray-400">드롭하세요</span>
              )}
            </div>
            <h4 className="text-center">{poke1?.name || " "}</h4>
          </Card>
        </li>
        <li ref={ref2} className="flex-1 p-1">
          <Card variant="outlined">
            <div className="aspect-1/1 flex items-center justify-center">
              {poke2 ? (
                <img
                  src={`https://projectpokemon.org/images/normal-sprite/${poke2.engName}.gif`}
                  alt={poke2.name}
                  className="max-w-[80px]"
                />
              ) : (
                <span className="text-gray-400">드롭하세요</span>
              )}
            </div>
            <h4 className="text-center">{poke2?.name || " "}</h4>
          </Card>
        </li>
      </ul>
    </div>
  );
};

export default PokeFloat;
