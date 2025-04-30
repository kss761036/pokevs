import Card from "@mui/material/Card";
import Input from "@mui/material/Input";
import { useDrop } from "react-dnd";
import { useRef, useEffect, useState } from "react";
import { Pokemon, typeMap } from "./type";
import PokeDrop from "./PokeDrop";
import Button from "@mui/material/Button";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { motion } from "framer-motion";

interface PokeFloatProps {
  filterName: string;
  setFilterName: (value: string) => void;
  filterTypes: string[];
  setFilterTypes: (types: string[]) => void;
}

const PokeFloat = ({
  filterName,
  setFilterName,
  filterTypes,
  setFilterTypes,
}: PokeFloatProps) => {
  const ref1 = useRef<HTMLLIElement>(null);
  const ref2 = useRef<HTMLLIElement>(null);

  const [poke1, setPoke1] = useState<Pokemon | null>(null);
  const [poke2, setPoke2] = useState<Pokemon | null>(null);

  const handleReset = () => {
    setPoke1(null);
    setPoke2(null);
  };

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
    <div className="">
      <form action="">
        <fieldset className="sr-only">검색</fieldset>
        <ul className="flex flex-col gap-y-4 fixed top-[100px] left-1/2 translate-x-[calc(-100%_-_250px)] w-[300px] p-5">
          <li>
            <div className="flex justify-end">
              <Button onClick={handleReset}>
                <RestartAltRoundedIcon
                  fontSize="small"
                  sx={{ color: "#000000" }}
                />
              </Button>
            </div>
            <ul className="flex items-start relative">
              {poke1 && poke2 && (
                <motion.button
                  type="button"
                  className="absolute left-1/2 top-[65px] -translate-1/2 cursor-pointer z-20 hover:bg-[rgba(253,199,23,0.2)] transition p-2 rounded-[5px]"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}>
                  <span className="text-[14px] font-bold">Click!</span>
                  <img className="h-[35px]" src="/vs.png" alt="vs아이콘" />
                </motion.button>
              )}
              <PokeDrop dropped={poke1} onDrop={setPoke1} />
              <PokeDrop dropped={poke2} onDrop={setPoke2} />
            </ul>
          </li>
        </ul>

        <ul className="flex flex-col gap-y-4 fixed top-[100px] right-1/2 translate-x-[calc(100%_+_250px)] w-[300px] p-5">
          <li>
            <TextField
              id="outlined-basic"
              label="포켓몬 이름으로 검색하기"
              variant="outlined"
              className="w-full"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
          </li>
          <li>
            <FormGroup className="!flex-row">
              {Object.entries(typeMap).map(([key, label]) => (
                <FormControlLabel
                  className="w-1/2 m-0"
                  key={key}
                  control={
                    <Checkbox
                      size="small"
                      checked={filterTypes.includes(label)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilterTypes([...filterTypes, label]);
                        } else {
                          setFilterTypes(
                            filterTypes.filter((t) => t !== label)
                          );
                        }
                      }}
                    />
                  }
                  label={label}
                  sx={{
                    margin: "0px",
                    "& .MuiFormControlLabel-label": { fontSize: 14 },
                  }}
                />
              ))}
            </FormGroup>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default PokeFloat;
