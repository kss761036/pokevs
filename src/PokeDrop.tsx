import { useDrop } from "react-dnd";
import Card from "@mui/material/Card";
import { useRef, useEffect } from "react";
import { Pokemon } from "./type";

interface PokeDropProps {
  onDrop: (pokemon: Pokemon) => void;
  dropped: Pokemon | null;
}

const PokeDrop = ({ onDrop, dropped }: PokeDropProps) => {
  const ref = useRef<HTMLLIElement>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "POKEMON_CARD",
    drop: (item: Pokemon) => {
      const isShiny = Math.random() < 0.3;
      const updated = {
        ...item,
        isShiny,
        image: isShiny
          ? `https://projectpokemon.org/images/shiny-sprite/${item.engName}.gif`
          : `https://projectpokemon.org/images/normal-sprite/${item.engName}.gif`,
      };
      onDrop(updated);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  useEffect(() => {
    if (ref.current) drop(ref.current);
  }, [drop]);

  return (
    <li ref={ref} className={`flex-1 p-1 ${isOver ? "bg-green-100" : ""}`}>
      <Card variant="outlined">
        <div className="aspect-1/1 flex items-center justify-center">
          {dropped ? (
            <img
              src={dropped.image}
              alt={dropped.name}
              className="max-w-[80px]"
            />
          ) : (
            <span className="text-gray-400">드롭하세요</span>
          )}
        </div>
      </Card>
      <h4 className="text-center">
        {dropped && dropped.isShiny && <span>✨</span>}
        {dropped?.name || " "}
      </h4>
    </li>
  );
};

export default PokeDrop;
