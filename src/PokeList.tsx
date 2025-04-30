import axios from "axios";
import { useEffect, useState } from "react";
import PokeItem from "./PokeItem";
import { Pokemon, PokemonSpecies, TypeInfo, typeMap } from "./type";
import InfiniteScroll from "react-infinite-scroll-component";

const LIMIT = 12;
const FIRST_LIMIT = 39;
const MAX = 300;

const PokeList = () => {
  const [pokeData, setPokeData] = useState<Pokemon[]>([]);

  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchPoke = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const limit = offset === 0 ? FIRST_LIMIT : LIMIT;

    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    const results = res.data.results;

    const pokemonList = await Promise.all(
      results.map(async (pokemon: Pokemon) => {
        const id = pokemon.url.split("/").filter(Boolean).pop();
        const [speciesRes, detailRes] = await Promise.all([
          axios.get<PokemonSpecies>(
            `https://pokeapi.co/api/v2/pokemon-species/${id}/`
          ),
          axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`),
        ]);

        const koName = speciesRes.data.names.find(
          (n) => n.language.name === "ko"
        );

        const types = (detailRes.data.types as TypeInfo[]).map(
          (t) => typeMap[t.type.name] || t.type.name
        );

        const description = speciesRes.data.flavor_text_entries
          .find((entry) => entry.language.name === "ko")
          ?.flavor_text.replace(/\n|\f/g, " ");

        return {
          id,
          name: koName?.name || pokemon.name,
          url: pokemon.url,
          image: `https://img.pokemondb.net/sprites/black-white/normal/${pokemon.name}.png`,
          engName: pokemon.name,
          types,
          description,
        };
      })
    );

    setPokeData((prev) => [...prev, ...pokemonList]);
    setOffset((prev) => prev + limit);
    setHasMore(offset + limit < MAX);
    setLoading(false);
  };

  useEffect(() => {
    fetchPoke();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InfiniteScroll
      dataLength={pokeData.length}
      next={fetchPoke}
      hasMore={hasMore}
      loader={<p className="text-center py-4">로딩 중...</p>}>
      <ul className="flex max-w-[500px] mx-auto flex-wrap">
        {pokeData.map((pokemon) => (
          <li className="w-1/3 p-1" key={pokemon.id}>
            <PokeItem pokemon={pokemon} />
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  );
};

export default PokeList;
