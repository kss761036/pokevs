import Card from "@mui/material/Card";
import axios from "axios";
import { useEffect, useState } from "react";

interface Language {
  name: string;
}

interface NameEntry {
  language: Language;
  name: string;
}

interface PokemonSpecies {
  names: NameEntry[];
}

interface Pokemon {
  id: number;
  name: string;
  url: string;
  names?: NameEntry[];
  image?: string;
  engName?: string;
}

const PokeList = () => {
  const [pokeData, setPokeData] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPoke = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=100"
      );
      const results = res.data.results;

      const pokemonList = await Promise.all(
        results.map(async (pokemon: Pokemon) => {
          const id = pokemon.url.split("/").filter(Boolean).pop();
          const speciesRes = await axios.get<PokemonSpecies>(
            `https://pokeapi.co/api/v2/pokemon-species/${id}/`
          );
          const detailRes = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${id}/`
          );

          const koName = speciesRes.data.names.find(
            (n) => n.language.name === "ko"
          );

          return {
            id,
            name: koName?.name || pokemon.name,
            url: pokemon.url,
            image: `https://img.pokemondb.net/sprites/black-white/normal/${pokemon.name}.png`,
            engName: pokemon.name,
          };
        })
      );

      setPokeData(pokemonList);
    };
    fetchPoke();
  }, []);

  console.log(pokeData);

  return (
    <>
      <ul className="flex max-w-[500px] mx-auto flex-wrap">
        {pokeData.map((pokemon) => (
          <li className="w-1/3 p-1" key={pokemon.id}>
            <div className="hover:bg-yellow-400 cursor-grab transition-all">
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
          </li>
        ))}
      </ul>
    </>
  );
};

export default PokeList;
