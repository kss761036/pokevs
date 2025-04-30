import axios from "axios";
import { useEffect, useState } from "react";
import PokeItem from "./PokeItem";
import { Pokemon, PokemonSpecies } from "./type";

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
            <PokeItem pokemon={pokemon} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default PokeList;
