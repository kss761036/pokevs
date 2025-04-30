import axios from "axios";
import { useEffect, useState } from "react";
import PokeItem from "./PokeItem";
import { Pokemon, PokemonSpecies, TypeInfo, typeMap } from "./type";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "@mui/material/Skeleton";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

interface PokeListProps {
  filterName: string;
  filterTypes: string[];
}

const SkeletonCard = () => (
  <li className="w-1/3 p-1">
    <div className="border border-gray-100 p-2 rounded shadow-sm">
      <Skeleton variant="rectangular" width="100%" height={80} />
      <Skeleton
        width="80%"
        height={24}
        style={{ marginTop: 8, justifySelf: "center" }}
      />
    </div>
  </li>
);

const PokeList = ({ filterName, filterTypes }: PokeListProps) => {
  const [allData, setAllData] = useState<Pokemon[]>([]);
  const [filteredData, setFilteredData] = useState<Pokemon[]>([]);
  const [visibleCount, setVisibleCount] = useState(39);
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState<Pokemon | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      setLoading(true);

      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=300"
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

      setAllData(pokemonList);
      setFilteredData(pokemonList);
      setLoading(false);
    };

    fetchAllPokemon();
  }, []);

  useEffect(() => {
    const filtered = allData.filter((pokemon) => {
      const nameMatch = pokemon.name.includes(filterName.trim());
      const typeMatch =
        filterTypes.length === 0 ||
        filterTypes.some((type) => (pokemon.types ?? []).includes(type));
      return nameMatch && typeMatch;
    });

    setFilteredData(filtered);
    setVisibleCount(39);
  }, [allData, filterName, filterTypes]);

  const fetchMore = () => {
    setTimeout(() => {
      setVisibleCount((prev) => prev + 12);
    }, 300);
  };
  const pokeData = filteredData.slice(0, visibleCount);

  if (loading) {
    return (
      <ul className="flex max-w-[500px] mx-auto flex-wrap">
        {Array.from({ length: 39 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </ul>
    );
  }

  return (
    <>
      <InfiniteScroll
        dataLength={pokeData.length}
        next={fetchMore}
        hasMore={pokeData.length < filteredData.length}
        loader={<p className="text-center py-4">로딩 중...</p>}
        scrollThreshold={1}>
        <ul className="flex max-w-[500px] mx-auto flex-wrap">
          {pokeData.map((pokemon) => (
            <li className="w-1/3 p-1" key={pokemon.id}>
              <PokeItem
                pokemon={pokemon}
                onClick={() => {
                  setSelected(pokemon);
                  setOpen(true);
                }}
              />
            </li>
          ))}
        </ul>
      </InfiniteScroll>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
          }}>
          {selected && (
            <>
              <div className="flex items-center justify-center w-[230px] h-[230px] mx-auto">
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="mx-auto w-[170px]"
                />
              </div>
              <h2 className="text-xl font-bold text-center">{selected.name}</h2>
              <p className="text-center mt-3 break-keep">
                {selected.description}
              </p>
              <p className="text-center mt-3 text-gray-500">
                {selected.types?.join(", ")}
              </p>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default PokeList;
