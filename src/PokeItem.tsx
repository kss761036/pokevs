import { useDrag } from "react-dnd";
import Card from "@mui/material/Card";
import { Pokemon } from "./type";
import { useEffect, useRef } from "react";

interface PokeItemProps {
  pokemon: Pokemon;
  onClick?: () => void;
}

const PokeItem = ({ pokemon, onClick }: PokeItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "POKEMON_CARD",
    item: {
      id: pokemon.id,
      name: pokemon.name,
      engName: pokemon.engName,
      types: pokemon.types,
      description: pokemon.description,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    if (ref.current) {
      drag(ref.current);
    }
  }, [ref, drag]);

  return (
    <div
      onClick={onClick}
      ref={ref}
      className={`hover:bg-yellow-400 cursor-grab transition-all rounded-[4px] ${
        isDragging ? "hidden" : ""
      }`}>
      <Card variant="outlined" sx={{ backgroundColor: "transparent" }}>
        <div className="flex justify-center">
          <img
            src={pokemon.image}
            alt={pokemon.name}
            draggable="false"
            className="select-none pointer-events-none"
          />
        </div>
        <h3 className="text-center py-2">{pokemon.name}</h3>
      </Card>
    </div>
  );
};

export default PokeItem;
