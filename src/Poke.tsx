import React, { useState, useEffect } from "react";
import axios from "axios";

interface Pokemon {
  name: string;
  url: string;
  id: string;
  koreanName: string;
}

interface SpeciesName {
  language: {
    name: string;
  };
  name: string;
}

interface PokemonSpeciesResponse {
  names: SpeciesName[];
}

const Poke = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonPerPage = 10;

  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await axios.get<{ results: { name: string; url: string }[] }>(
        `https://pokeapi.co/api/v2/pokemon?offset=${
          (currentPage - 1) * pokemonPerPage
        }&limit=${pokemonPerPage}`
      );

      const list = res.data.results.map((p) => {
        const id = p.url.split("/").filter(Boolean).pop()!;
        return { ...p, id, koreanName: "" };
      });

      setPokemonData(list);

      list.forEach(async (p) => {
        const speciesRes = await axios.get<PokemonSpeciesResponse>(
          `https://pokeapi.co/api/v2/pokemon-species/${p.id}`
        );
        const koreanEntry = speciesRes.data.names.find(
          (name) => name.language.name === "ko"
        );
        setPokemonData((prev) =>
          prev.map((item) =>
            item.id === p.id
              ? {
                  ...item,
                  koreanName: koreanEntry ? koreanEntry.name : item.name,
                }
              : item
          )
        );
      });
    };

    fetchPokemon();
  }, [currentPage]);

  return (
    <>
      {pokemonData.map((pokemon) => (
        <div
          key={pokemon.id}
          className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">
            {pokemon.koreanName || pokemon.name}
          </h1>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            alt={pokemon.koreanName || pokemon.name}
            className="w-32 h-32"
          />
        </div>
      ))}
    </>
  );
};

export default Poke;
