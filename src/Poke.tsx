import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";

interface Pokemon {
  name: string;
  url: string;
  id: string;
  koreanName: string;
}

interface SpeciesName {
  language: { name: string };
  name: string;
}

interface PokemonSpeciesResponse {
  names: SpeciesName[];
}

interface PokemonDetailResponse {
  height: number;
  weight: number;
  base_experience: number;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
}

const Poke = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPokemonId, setSelectedPokemonId] = useState<string | null>(
    null
  );
  const [modalData, setModalData] = useState<PokemonDetailResponse | null>(
    null
  );
  const [open, setOpen] = useState(false);

  const pokemonPerPage = 300;

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
        const ko = speciesRes.data.names.find((n) => n.language.name === "ko");
        setPokemonData((prev) =>
          prev.map((item) =>
            item.id === p.id
              ? { ...item, koreanName: ko ? ko.name : p.name }
              : item
          )
        );
      });
    };

    fetchPokemon();
  }, [currentPage]);

  useEffect(() => {
    const fetchDetail = async () => {
      if (selectedPokemonId) {
        const res = await axios.get<PokemonDetailResponse>(
          `https://pokeapi.co/api/v2/pokemon/${selectedPokemonId}`
        );
        setModalData(res.data);
        setOpen(true);
      }
    };
    fetchDetail();
  }, [selectedPokemonId]);

  const handleClose = () => {
    setOpen(false);
    setModalData(null);
    setSelectedPokemonId(null);
  };

  return (
    <>
      <div className="flex justify-center items-center py-4">
        <img className="h-[100px]" src="/public/logo.png" alt="로고" />
      </div>
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {pokemonData.map((pokemon) => (
          <div key={pokemon.id}>
            <Card>
              <CardActionArea onClick={() => setSelectedPokemonId(pokemon.id)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                  alt={pokemon.name}
                />
                <CardContent>
                  <Typography variant="h6" align="center">
                    {pokemon.koreanName || pokemon.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        ))}
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>포켓몬 정보</DialogTitle>
        <DialogContent>
          {modalData && (
            <>
              <img
                src={modalData.sprites.front_default}
                alt=""
                style={{ display: "block", margin: "0 auto" }}
              />
              <Typography>키: {modalData.height / 10} m</Typography>
              <Typography>몸무게: {modalData.weight / 10} kg</Typography>
              <Typography>기본 경험치: {modalData.base_experience}</Typography>
              <Typography>
                타입: {modalData.types.map((t) => t.type.name).join(", ")}
              </Typography>
              <Button
                onClick={handleClose}
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}>
                닫기
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Poke;
