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

const PokeFloat = () => {
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
            <ul className="flex items-start">
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
                      sx={{
                        pl: 0,
                        pr: 1,
                        "& .MuiSvgIcon-root": {
                          fontSize: 18,
                        },
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
